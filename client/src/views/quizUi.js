var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var AttenUI = require("./attenUI.js");
var UI = require("./ui.js");

var counter = 0;
var finalQuestion = false;

var QuizUI = function(){

  // var next = document.querySelector("#next-button");
  // nextButton.onclick = this.handleNextButton.bind(this);
}

QuizUI.prototype = {
  createAnswerButtons: function(animal){
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
    counter ++;
    questionsObject = animal.questions;
    // console.log(questionsObject);
    if (counter == 1) {
      attenTalk.innerText = questionsObject.one;
    }
    else if (counter == 2) {
      attenTalk.innerText = questionsObject.two;
    } 
    else if (counter == 3) {
      attenTalk.innerText = questionsObject.three
      finalQuestion = true;
    }
    else { console.log("finished!")
    addAnimalToDb();
    }
  },

  answerQuestion: function(animal, button) {
    attenUI = new AttenUI();
    if (animal.name === button && !finalQuestion) {
      attenUI.answerCorrectText(animal);
      // addAnimalToDb();
      // renderNotebookAnimal();
    } else if (animal.name !== button && !finalQuestion){
      
      attenUI.wrongText();

      // console.log(this)
      // this.changeAttenTalk(animal);
      // console.log("string of attenUI.wrongText");
    } else if (animal.name !== button && finalQuestion){
      attenUI.finalWrongText(animal);
    } else if (animal.name === button && finalQuestion){
      attenUI.answerCorrectText(animal);
    }
  }
}


module.exports = QuizUI;