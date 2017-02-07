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
    var nextButton = document.querySelector("#next-button");
    attenUI = new AttenUI();
    if (animal.name === button && !finalQuestion) {
      attenUI.answerCorrectText(animal);
      nextButton.style.visibility = "hidden";
      // addAnimalToDb();
      // renderNotebookAnimal();
    } else if (animal.name !== button && !finalQuestion){
      
      attenUI.wrongText();

      // console.log(this)
      // this.changeAttenTalk(animal);
      // console.log("string of attenUI.wrongText");
    } else if (animal.name !== button && finalQuestion){
      attenUI.finalWrongText(animal);
      nextButton.style.visibility = "hidden";
    } else if (animal.name === button && finalQuestion){
      attenUI.answerCorrectText(animal);
      nextButton.style.visibility = "hidden";
    }
  }
}


module.exports = QuizUI;