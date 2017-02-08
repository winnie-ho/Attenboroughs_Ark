var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");
var QuizUI = require("./views/quizUI.js");
var Animals = require("./models/animals.js");

var animal = null;

var app = function() {

  var ui = new UI();

  var attenUI = new AttenUI();
  var quizUI = new QuizUI();

  attenUI.startText();
  
}

window.onload = app;