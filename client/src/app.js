var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");


var app = function() {
  var ui = new UI();
  var attenUI = new AttenUI();
  attenUI.startText();

  var nextButton = document.querySelector("#next-button");
  nextButton.onclick = ui.handleNextButton;

  // var quizButton = document.querySelector("#quiz-button");
  // var quizButton.onclick = ui.handleQuizButton
  // console.log("Hi there")
  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();

  
}

window.onload = app;