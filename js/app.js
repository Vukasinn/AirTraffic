// Application opens, user is asked to give his geolocation (done)
//      User Denies: There is a message telling him that it is necessary to run the app(done)
//      User Accepts: A listing opens containing:
//          Airplane Icon oriented left or right depending if the flight is west or east bound
//          Altitude
//          Flight code number
//      When the user clicks on the listing item, he'll see following details:
//          Airplane Manufacturer and model
//          Destionation and Flight Origin airport
//          Logo of the Airline company

document.addEventListener("DOMContentLoaded", () => {

    const APIrequest = (lat, long) => {
        fetch(`https://cors-anywhere.herokuapp.com/http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${long}&fDstL=0&fDstU=100`)
            .then(res => res.json())
            .then((data) => {
                // here is the data. We want the acList value
                // sort data from highest altitude down to lowest
                // set global planes data
                const planesData = data.acList.sort((a, b) => b.Alt - a.Alt);

                // call DOM update handler here pass -> (data.acList.sort((a, b) => b.Alt - a.Alt))
                updateDOM(data.acList.sort((a, b) => b.Alt - a.Alt));
                console.log(planesData);
            });
    };

    // create DOM update handler here
    const updateDOM = (planesData) => {
        // target parent container, in this case it's the #plane_container
        const parent = document.querySelector('#planeContainer')
        // loop planes data -> parent.append(html)

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        planesData.forEach(plane => {
            let node = document.createElement('DIV')
            node.classList.add('col-sm')
            node.innerHTML = `
          <div id="accordition">
          <div class="card">
            <div class="card-header" id="headingThree">
              
                <h3 data-toggle="collapse" data-target="#collapseThree" aria-expanded="true" aria-controls="collapseThree"></h3>
                <p class="listPart"><strong>Plane Altitude:</strong> ${plane.Alt}</p>
                <p class="listPart"><strong>ID of the flight:</strong> ${plane.Id}</p>
                
                <div class="detailed">
                    <h6 class="listPart">Airplane Manufacturer: ${plane.Man}</h6>
                    <h6 class="listPart">Airplane Model: ${plane.Mdl}</h6>
                    <h6 class="listPart">Destionation: ${plane.To}</h6>
                    <h6 class="listPart">Flight Origin: ${plane.From}</h6>
                    <img src="https://logo.clearbit.com/${plane.Man}</img>
                </div>
            </div>
            </div>
        `
            parent.appendChild(node)
        })

        // we have planesData array (it has aircraft objects as each ELEMENT)
        // what map does is it will iterate over the array and return a COPY of the array
        // that has every ELEMENT formatted in some way defined by the callback function of map
        // map((e) => { /*everything in here to will be applied to each (e)*/ 
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            APIrequest(lat, long); // initial API call on load
            setInterval(() => APIrequest(lat, long), 60000); // subsequent calls every 60 seconds
        },
        (error) => {
            if (error.code == error.PERMISSION_DENIED)
                document.querySelector('.errorText').innerHTML = "Please allow usage of your geolocation, it is necessary to run the app."
        });
});