var UI = require("./views/ui");

var app = function() {
  var ui = new UI();

  var nextButton = document.querySelector("#next-button");
  nextButton.onclick = ui.handleNextButton;
  // var resetButton = document.querySelector("#reset-button");
  // resetButton.onclick = ui.handleResetButton;
  // var quizButton = document.querySelector("#quiz-button");
  // var quizButton.onclick = ui.handleQuizButton
  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();

  var map = new google.maps.Map(document.querySelector("#mapDiv"), {
      zoom: 1,
      center: {lat: 0, lng: -180},
    });

    var flightPlanCoordinates = [
      {lat: 56.772, lng: -3.214},
      {lat: 21.291, lng: -157.821},
      {lat: -18.142, lng: 178.431},
      {lat: -27.467, lng: 153.027}
    ];
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(map);
  
}

window.onload = app;