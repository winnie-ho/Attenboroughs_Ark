var MapWrapper = function(coords, zoom) {
  var container = document.querySelector("#mapDiv");
    this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
    });
}


MapWrapper.prototype = {
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    console.log("marker added");
    return marker;
  },

  addPolyline: function(pathCoords){
    var lineSymbol = {
       path: "M43.734,21c-3.631,0-15.092,0-15.092,0  S16.25,5.188,16.047,4.938s-0.422-0.594-1.125-0.672c-0.859-0.095-1.969-0.203-2.328-0.234c-0.406-0.035-0.719,0.141-0.496,0.734  C12.388,5.539,18.748,21,18.748,21H6.034c0,0-2.458-4.722-2.878-5.531C2.965,15.101,2.557,15.014,2,15H1.297  c-0.125,0-0.312,0-0.281,0.344C1.058,15.811,3,25,3,25s-1.888,9.197-1.984,9.656C0.953,34.953,1.172,35,1.297,35H2  c0.966-0.009,0.954-0.079,1.156-0.469C3.576,33.722,6.034,29,6.034,29h12.714c0,0-6.36,15.461-6.65,16.234  c-0.223,0.594,0.09,0.77,0.496,0.734c0.359-0.031,1.469-0.139,2.328-0.234c0.703-0.078,0.922-0.422,1.125-0.672S28.643,29,28.643,29  s11.461,0,15.092,0c3.766,0,5.264-3.031,5.264-4S47.484,21,43.734,21z",

       anchor: new google.maps.Point(50,25),
       scale: 0.7,
       strokeColor: "red",
       fillColor: "red",
       fillOpacity: 1,
       strokeWeight: 0.5,
       rotation: 270
     };

    var iconPlane = {
        icon: lineSymbol,
        offset: '100%'
      };

    var line = new google.maps.Polyline({
      path: pathCoords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 1,
      icons: [iconPlane],
      map: this.googleMap
    });

    line.setMap(this.googleMap);
    this.animateFlight(line, pathCoords, lineSymbol);
  },

  animateFlight: function(line, pathCoords, lineSymbol) {
      var count = 0;
      window.setInterval(function() {
        count = (count + 1) % 200;

        var icons = line.get('icons');
        icons[0].offset = (count / 2) + '%';
        line.set('icons', icons);
    }, 20);
  },

  panTo: function(lat, lng){
    this.googleMap.panTo(new google.maps.LatLng(lat,lng));
    this.googleMap.setZoom(2);
  },

  addInfoWindow: function(map, marker, contentString){
    var infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });
      marker.addListener("click", function(){
      infoWindow.open(this.googleMap, marker);
    })
  },

  geoLocate: function(){
    navigator.geolocation.getCurrentPosition(function(position) {
      var centre = {lat: position.coords.latitude, lng: position.coords.longitude}; 
      this.googleMap.setCenter(centre); 
      var marker = this.addMarker(centre);

      var infoWindow = new google.maps.InfoWindow({
            content: "<h2>Home</h2>",
          });


      // var infoWindow = this.addInfoWindow(this.googleMap, marker, "<h2>Home</h2>");
      infoWindow.open(this.googleMap, marker);
    }.bind(this));
  }
}

module.exports = MapWrapper;

