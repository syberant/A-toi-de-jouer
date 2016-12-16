// vars
var listCoords = [
    // Eiffeltoren
    {
        lat: 48.857899,
        lng: 2.295111,
    },
    // Pont d'Avignon
    {
        lat: 43.952919,
        lng: 4.803665,
    },
    // Mont Saint-Michel
    {
        lat: 48.6335883,
        lng: -1.510495
    },
    // Carnac
    {
        lat: 47.5926204,
        lng: -3.0834078
    }
];
var coords;
var map;
var panorama;
var round = 1;
var rounds = 4;
var distances = [];
var selectedCoords = {
    lat: null,
    lng: null
}

function selectRandomCoords() {
    var randomCoord = Math.floor(Math.random() * (listCoords.length));
    console.log(randomCoord);
    coords = listCoords[randomCoord];
    listCoords.splice(randomCoord, 1);
}

// initalises map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.087451, lng: 5.099160},
    zoom: 1
    });

    panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),
    {
        position: {lat: coords.lat, lng: coords.lng},
        pov: {heading: 0, pitch: 0},
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
            document.getElementById("km").value = distance(coords.lat, coords.lng, selectedCoords.lat, selectedCoords.lng, "K");
    });

    // drag changes marker
    google.maps.event.addListener(selectedMarker, 'dragend', function(event) {
        selectedCoords.lat = event.latLng.lat();
        selectedCoords.lng = event.latLng.lng();
        document.getElementById("lat").value = event.latLng.lat();
        document.getElementById("lng").value = event.latLng.lng();
        selectedMarker.setPosition(selectedCoords);
        selectedMarker.setMap(map);
        document.getElementById("km").value = distance(coords.lat, coords.lng, selectedCoords.lat, selectedCoords.lng, "K");
    });
}

// calculate distance between two coords
function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}

function changePosition() {
    panorama = new google.maps.StreetViewPanorama(document.getElementById('street-view'),
    {
        position: {lat: coords.lat, lng: coords.lng},
        pov: {heading: 0, pitch: 0},
        zoom: 1
    });
}

function resetMarker() {
    var selectedMarker = new google.maps.Marker({
        draggable: true,
        position: null,
        map: map,
        title: "Selected location"
    });
}

function submit() {
    if (round >= rounds) {
        distances[round - 1] = distance(coords.lat, coords.lng, selectedCoords.lat, selectedCoords.lng, "K");
        console.log(distances);
    } else {
        distances[round - 1] = distance(coords.lat, coords.lng, selectedCoords.lat, selectedCoords.lng, "K");
        round ++;
        selectRandomCoords();
        changePosition();
    }
}

selectRandomCoords();
