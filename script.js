var coords = {
    lat: 48.857899,
    lng: 2.295111
}
var map;
var panorama;

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
}
