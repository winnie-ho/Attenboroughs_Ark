var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");


var app = function() {
  var ui = new UI();
  var attenUI = new AttenUI();
  attenUI.startText();
  var goButton = document.querySelector("#go-button");
  // var quizButton = document.querySelector("#quiz-button");
  // var quizButton.onclick = ui.handleQuizButton
  goButton.onclick = ui.handleGoButton;
  // console.log("Hi there")
  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();
}

window.onload = app;