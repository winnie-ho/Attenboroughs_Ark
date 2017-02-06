var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var AttenUI = require("./attenUI.js");
var UI = require("./ui.js");

var QuizUI = function(){

  // var next = document.querySelector("#next-button");
  // nextButton.onclick = this.handleNextButton.bind(this);
}

QuizUI.prototype = {
  createAnswerButtons: function(animal){

      var qAnswers = animal.buttonValues;
      console.log (qAnswers)

      for (var answer of qAnswers) {
        var answerButtons = document.querySelector("#QButtons");
        var answerButton = document.createElement("button");
        answerButton.id = "Button_" + answer;
        answerButton.classname = "animalNameButton";
        answerButton.innerText = answer;
        answerButtons.appendChild(answerButton);
      }
  },

  answerQuestionOne: function(animal, buttonValue) {
    if (name == buttonValue) {
      return "string of attenUI.answerCorrectText"
    } else {
      return "string of attenUI.wrongText"
    }
  },
  
}


module.exports = QuizUI;