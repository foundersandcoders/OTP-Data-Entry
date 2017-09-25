function placeMap () {
  var coords = document.getElementById('map').getAttribute('data-loc').split(',');
  var lat = coords[0];
  var lng = coords[1];
  var mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 18,
    disableDefaultUI: true
  };
  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map
  });
}
