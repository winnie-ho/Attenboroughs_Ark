var UI = require("./views/ui");

var app = function() {
  var ui = new UI();
  var goButton = document.querySelector("#go-button");
  // var quizButton = document.querySelector("#quiz-button");
  // var quizButton.onclick = ui.handleQuizButton
  goButton.onclick = ui.handleGoButton;
  // var mountainSounds = document.querySelector("#chinaMountain")
  // mountainSounds.play();
}

window.onload = app;