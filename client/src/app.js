var UI = require("./views/ui");
var AttenUI = require("./views/attenUI.js");
var QuizUI = require("./views/quizUi.js");
var Animals = require("./models/animals.js");

var animal = null;

var app = function() {
  var ui = new UI();


  var attenUI = new AttenUI();
  var quizUI = new QuizUI();

  // var animals = new Animals();
  // animals.allAPI(function(result){ 
  //   animal = result[0];
  //   // console.log(animal.buttonValues)
  // })

  attenUI.startText();


//   var nextButton = document.querySelector("#next-button");
//   // nextButton.onclick = ui.handleNextButton();
//   // console.log("1")
//   nextButton.onclick = function(){
//     quizUI.createAnswerButtons(animal);
//     quizUI.changeAttenTalk(animal);
//     // console.log("3")

// ////////////Question Buttons

//     var answerButton = document.querySelectorAll(".animalNameButton");
//     // console.log(answerButton)

//     var answerButtonsClickBehavour = function() {
//       var firedButton = this.innerText;
//       // console.log(firedButton)
//       quizUI.answerQuestion(animal, firedButton);
//     }

//     for (var i = 0; i < answerButton.length; i++) {
//       answerButton[i].onclick = answerButtonsClickBehavour;
//     }
//   }


  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();

  
}

window.onload = app;