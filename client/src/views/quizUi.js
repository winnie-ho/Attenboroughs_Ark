var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animal = require("../models/animal.js");

var UI = function(){
  // getQuestionOne: function() {
  //   return this.questions.one;
  // },
  // getQuestionTwo: function() {
  //   return this.questions.two;
  // },
  // getQuestionThree: function() {
  //   return this.questions.three;
  // },

  createAnswerButtons = function(countryAnimals){
    var quizButtons = document.querySelector("#QButtons");
    for (animal of countryAnimals) {
      answerButton = createElement('button')
      answerButton.innerText = animal.name;
      quizButtons.appendElement('answerButton')
    }
  }

  handleButtonClick = function (event) {
    var buttonResult = document.querySelector('answerbutton');
    buttonResult.innerText = 'Woah! I totally just got clicked ' + 
    counter + ' times';
    console.log(event);
  }

  answerQuestionOne = function(buttonValue) {
    this.getQuestionOne();
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      return wrongAnswerMessage
    }
  },

  questionOneAnswer = function(){
   buttons = document.querySelector("quiz-button")
   answerQuestionOne(buttons.value)
 }

 attenboroughRender = function() {
   var attenough = document.querySelector("attenboroughBox")
   if(answerQuestionOne() == true) {
     return this.answerText 
   } else { 
     return wrongAnswerMessage
   },
 }

}