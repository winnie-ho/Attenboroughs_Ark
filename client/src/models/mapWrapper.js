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
      map: this.googleMap
    });
    console.log("marker added");
    return marker;
  },

  addPolyline: function(pathCoords){
    var path = new google.maps.Polyline({
      path: pathCoords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    path.setMap(this.googleMap);
  },

  panTo: function(lat, lng){
    this.googleMap.panTo(new google.maps.LatLng(lat,lng));
  },

  addInfoWindow: function(map, marker, contentString){
    var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
      marker.addListener("click", function(){
      infoWindow.open(this.googleMap, marker);
    })
  }

  // geoLocate: function(runArray){

  //   console.log(runArray);
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var centre = {lat: position.coords.latitude, lng: position.coords.longitude}; 
  //     this.googleMap.setCenter(centre); 
  //     var marker = this.addMarker(centre);
  //     var nearRuns = document.querySelector("#near-runs");
  //     this.addInfoWindow(this.googleMap, marker, "You Are Here")
  //     for (var run of runArray){
  //       if (Math.sqrt(Math.pow((run.start_latlng[0] - position.coords.latitude),2))< 0.005){
  //         var runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
  //         this.addInfoWindow(this.googleMap, runMarker, run.name);
  //         var nearRunsInfo = document.createElement("p");
  //         nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
  //         nearRuns.appendChild(nearRunsInfo);
  //         var division = document.createElement("hr");
  //         nearRuns.appendChild(division);
  //         console.log(run.start_latlng[0])
  //         console.log(position.coords.latitude);
  //         console.log(run.start_latlng[0]-position.coords.latitude)
  //         console.log(run.name + "added");

  //       } else if (Math.sqrt(Math.pow((run.start_latlng[1] - position.coords.longitude),2)) < 0.005){
  //         var runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
  //         this.addInfoWindow(this.googleMap, runMarker, run.name);
  //         var nearRunsInfo = document.createElement("p");
  //         nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
  //         nearRuns.appendChild(nearRunsInfo);
  //         var division = document.createElement("hr");
  //         nearRuns.appendChild(division);
  //         console.log(run.start_latlng[1])
  //         console.log(position.coords.longitude);
  //         console.log(run.start_latlng[1]-position.coords.longitude);
  //         console.log(run.name + "added");
  //       }
  //     }
  //   }.bind(this)); 
  // }


}

module.exports = MapWrapper;

