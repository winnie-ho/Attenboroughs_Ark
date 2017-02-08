var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");
var QuizUI = require("./views/quizUI.js");
var Animals = require("./models/animals.js");
var MapWrapper = require("./models/mapWrapper.js");

var animal = null;

var app = function() {


  //creates the map
  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 56, lng: -3 };
  this.map = new MapWrapper(centre, 3);
  this.map.geoLocate();

  var ui = new UI(this.map);
  ui.addHereToDB();

  var nextButton = document.querySelector("#next-button");
  nextButton.style.visibility = "hidden";


  var attenUI = new AttenUI();
  var quizUI = new QuizUI();

  attenUI.startText();
  
}

window.onload = app;