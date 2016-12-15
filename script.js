// vars
var coords = {
    lat: 48.857899,
    lng: 2.295111
}
var map;
var panorama;
var selectedCoords = {
    lat: null,
    lng: null
}

// initalises map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: coords.lat, lng: coords.lng},
    zoom: 2
    });

    panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),
    {
        position: {lat: coords.lat, lng: coords.lng},
        pov: {heading: 165, pitch: 0},
        zoom: 1
    });

    // creates new marker

    var selectedMarker = new google.maps.Marker({
        draggable: true,
        position: selectedCoords,
        map: map,
        title: "Selected location"
    });

    // click adds marker
    google.maps.event.addListener(map, 'click', function (event) {
            selectedCoords.lat = event.latLng.lat();
            selectedCoords.lng = event.latLng.lng();
            document.getElementById("lat").value = event.latLng.lat();
            document.getElementById("lng").value = event.latLng.lng();
            selectedMarker.setPosition(selectedCoords);
            selectedMarker.setMap(map);

    });
}
