var map;

var markers = [];



// // Adds a marker to the map and push to the array.
// function addMarker(location) {
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map
//   });
//   markers.push(marker);
// }


function loadTheMap(){

  // This makes the map active
  navigator.geolocation.getCurrentPosition(function(location){
    var latitude = location.coords.latitude;
    var longitude = location.coords.longitude;
    var latLng = new google.maps.LatLng(latitude, longitude);

    showMap(latLng);

  });
}

function addMarker(location , id, username) {

  var contentString = '<div id="infoModal">'+
        '<h1 id="firstHeading" class="firstHeading">Tickets!</h1>'+
        '<div id="bodyContent">'+  
        'Check out the tickets to sell from '+
        username + '  ' + 
        "<input id='modalButton' type='button' class = 'show' value='See List' data-id="
        + id + '>' +
        '</div>'+ '</div>';

  var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

  if(markers[id]) {

    var marker = markers[id];
    marker.setPosition(location);
    console.log('existing marker' , id);

  } else {

    console.log('new marker' , id);

    var marker = new google.maps.Marker({
      position: location,
      map: map,
    });

    marker.addListener('click', function() {
         infowindow.open(map, marker);
         console.log("infowindow clicked")
          });

    markers[id]=marker;
  }


  
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


function getMyLocation() {

 if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(displayLocation);
  } else {
  alert("no geolocation support");
  }
}


function clearMarkers() {
  setMapOnAll(null);
}


function displayLocation(position) {

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  var latLng = new google.maps.LatLng(latitude, longitude);

  return latLng;
 
}

function showMap(latLng) {
  var styles = [{"featureType":"landscape","stylers":[{"hue":"#F1FF00"},{"saturation":-27.4},{"lightness":9.4},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#0099FF"},{"saturation":-20},{"lightness":36.4},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#00FF4F"},{"saturation":0},{"lightness":0},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FFB300"},{"saturation":-38},{"lightness":11.2},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#00B6FF"},{"saturation":4.2},{"lightness":-63.4},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#9FFF00"},{"saturation":0},{"lightness":0},{"gamma":1}]}];

  var mapOptions = {
    center: latLng,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styles
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}