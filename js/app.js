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

document.addEventListener("DOMContentLoaded", function () {

    let planesData;
    const APIrequest = (lat, long) => {
        fetch(
                `https://cors-anywhere.herokuapp.com/http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=${lat}&lng=${long}&fDstL=0&fDstU=100`)
            .then(res => res.json())
            .then(data => {
                // here is the data. We want the acList value
                // sort data from highest altitude down to lowest
                // set global planes data
                planesData = data.acList.sort((a, b) => b.Alt - a.Alt);
                console.log(planesData);
            })
    }



    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            APIrequest(lat, long); // initial API call on load
            setInterval(() => APIrequest(lat, long), 3000); // subsequent calls every 60 seconds
        },
        (error) => {
            if (error.code == error.PERMISSION_DENIED)
                document.querySelector('.errorText').innerHTML = "Please allow usage of your geolocation, it is necessary to run the app."
        });
});