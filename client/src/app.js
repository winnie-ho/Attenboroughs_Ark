var UI = require("./views/ui");

var app = function() {
  var ui = new UI();
  var goButton = document.querySelector("#go-button");
  goButton.onclick = ui.handleGoButton;
  // var quizButton = document.querySelector("#quiz-button");
  // var quizButton.onclick = ui.handleQuizButton
  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();
}

window.onload = app;