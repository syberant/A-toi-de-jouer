// vars
var beginCoords = [
    // Eiffeltoren
    {
        lat: 48.857899,
        lng: 2.295111
    },
    // Charleroi
    {
        lat: 50.411704,
        lng: 4.444403
    }
];
var listCoords = beginCoords;
var coords;
var map;
var panorama;
var selectedCoords = {
    lat: null,
    lng: null
}

/* disabled first random coordinates function to test and use more advanced one.
var randomCoord = Math.floor(Math.random() * (listCoords.length));
console.log(randomCoord);
coords = listCoords[randomCoord];
*/
coords = randomCoords(false);

// initalises map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 52.087451, lng: 5.099160},
    zoom: 1
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

// randomCoord function
function randomCoords(erase) {
	// get random coordinates from listCoords
	var randomNumber = Math.floor(Math.random() * (listCoords.length));
	var randomCoord = listCoords[randomNumber];
	
	// erase the chosen coordinates if erase = true
	if (erase) {
		var changeCoords = [];
		if (randomCoord == (listCoords.length - 1)) {
			listCoords.pop();
		}
		else {
			changeCoords = listCoords.slice(0, randomNumber);
			listCoords = changeCoords.concat(listCoords.slice(randomNumber + 1, listCoords.length - 1));
		}
	}
	
	// return the random coordinates
	console.log("The chosen coordinates are: "+randomCoord.lat+", "+randomCoord.lng+" and erase was "+erase);
	return randomCoord;
}
