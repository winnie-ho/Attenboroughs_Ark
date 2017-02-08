
var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var AttenUI = require("./attenUI.js");
var counter = 0;
var finalQuestion = false;


var QuizUI = function(){

}

QuizUI.prototype = {
  createAnswerButtons: function(animal){
    // console.log(AttenUI)
    var buttonDiv = document.querySelector("#QButtons");
    buttonDiv.innerHTML = "";

    var qAnswers = animal.buttonValues;

    for (var answer of qAnswers) {
      var answerButtons = document.querySelector("#QButtons");
      var answerButton = document.createElement("button");
      answerButton.id = "answerButton";
      answerButton.classList.add("animalNameButton");
      answerButton.innerText = answer;
      answerButtons.appendChild(answerButton);
    }
  },

  changeAttenTalk: function(animal) {

    attenUI = new AttenUI();
    var buttonDiv = document.querySelector("#QButtons");
    var nextButton = document.querySelector("#next-button");
    counter ++;
    questionsObject = animal.questions;
    // console.log(questionsObject);
    if(counter === 1){
      attenUI.initiateQuestions();
    }
    else if (counter === 2) {
      nextButton.style.visibility = "hidden";
      buttonDiv.style.visibility = "visible";
      attenTalk.innerText = questionsObject.one;
    }
    else if (counter === 3) {
      nextButton.style.visibility = "hidden";
      buttonDiv.style.visibility = "visible";
      attenTalk.innerText = questionsObject.two;
    } 
    else if (counter === 4) {
      nextButton.style.visibility = "hidden";
      buttonDiv.style.visibility = "visible";
      attenTalk.innerText = questionsObject.three
      finalQuestion = true;
    }
    else { console.log("problem!")
    // addAnimalToDb();
    }
  },

  answerQuestion: function(animal, button) {
    var UI = require("./ui");
    var nextButton = document.querySelector("#next-button");
    var attenUI = new AttenUI();
    var ui = new UI();
    // console.log("this" + this)

  // console.log(ui)
    console.log(AttenUI)
    if (animal.name === button && !finalQuestion) {
      attenUI.answerCorrectText(animal);
      // nextButton.style.visibility = "hidden";
    console.log("correct 1 2")
      ui.addAnimalToDb(animal, function(){
        // console.log("Here I am")
        var animals = new Animals;
        animals.allVisited(function(result){
          // console.log("Here" + ui)
          ui.renderNotebookAnimal(result);
        });
      }); 
      counter = 0; 
    } else if (animal.name !== button && !finalQuestion){
    // counter ++;
      attenUI.wrongText();
    } else if (animal.name !== button && finalQuestion){

      attenUI.finalWrongText(animal);
      nextButton.style.visibility = "hidden";
  // console.log("all wrong")
      ui.addAnimalToDb(animal, function(){
        // console.log("Here I am")
        var animals = new Animals;
        animals.allVisited(function(result){
          // console.log("Here" + ui)
          ui.renderNotebookAnimal(result);
        });
      });  
  counter = 0;
  finalQuestion = false;
    } else if (animal.name === button && finalQuestion){

      attenUI.answerCorrectText(animal);
      nextButton.style.visibility = "hidden";
  // console.log("correct 3")
      ui.addAnimalToDb(animal, function(){
        // console.log("Here I am")
        var animals = new Animals;
        animals.allVisited(function(result){
          // console.log("Here" + ui)
          ui.renderNotebookAnimal(result);
        });
      });  
  counter = 0;
  finalQuestion = false;
    }
  }
}


module.exports = QuizUI;