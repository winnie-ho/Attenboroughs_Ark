var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");
var QuizUI = require("./views/quizUi.js");
var Animals = require("./models/animals.js");

var animal = null;

var app = function() {
  var ui = new UI();

  var attenUI = new AttenUI();
  var quizUI = new QuizUI();

  var animals = new Animals();
  animals.allAPI(function(result){ 
    animal = result[0];
    console.log(animal.buttonValues)
  })

  attenUI.startText();

  var nextButton = document.querySelector("#next-button");
  // nextButton.onclick = ui.handleNextButton();
  console.log("1")
  nextButton.onclick = function(){
    quizUI.createAnswerButtons(animal);
  }
  console.log("3")

  // var answerQuestionOne = document.querySelector(".animalNameButton");
  // answerQuestionOne.onclick = quizUI.answerQuestionOne();

  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();

  
}

window.onload = app;