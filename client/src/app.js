var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");
var QuizUI = require("./views/quizUi.js");


var app = function() {
  var ui = new UI();
  var attenUI = new AttenUI();
  var quizUI = new QuizUI();

  attenUI.startText();

  var nextButton = document.querySelector("#next-button");
  nextButton.onclick = ui.handleNextButton;

  var goButton = document.querySelector("#go-button");
  goButton.onclick = quizUI.createAnswerButtons();

  var answerQuestionOne = document.querySelector(".animalNameButton");
  answerQuestionOne.onclick = quizUI.answerQuestionOne();

  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();

  
}

window.onload = app;