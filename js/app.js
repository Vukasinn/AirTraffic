let api = "http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?"


navigator.geolocation.watchPosition(function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        console.log(latitude);
        console.log(longitude);
    },
    function (error) {
        if (error.code == error.PERMISSION_DENIED)
            document.querySelector('.errorText').innerHTML = "Please allow usage of your geolocation, it is necessary to run the app."
    });