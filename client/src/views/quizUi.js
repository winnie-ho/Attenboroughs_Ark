var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var AttenUI = require("./attenUI.js");
var UI = require("./ui.js");

var QuizUI = function(){

  // var next = document.querySelector("#next-button");
  // nextButton.onclick = this.handleNextButton.bind(this);

  // this.countries = new Countries();

  var answerButton = document.querySelector("#button");
  answerButton.onclick = this.handleButtonClick.bind(this);

quizUI.prototype = {
  createAnswerButtons = function(animal){
    var animals = new Animals();
    animals.allAPI(function(result){ 
    console.log(result);

    var qAnswers = animal.buttonValues;
    for (var animal of result) {
      var answerButton = createElement("button")
      answerButton.innerText = animal;
      quizButtons.appendElement('answerButton')
    }
  },

  handleButtonClick = function (event) {
    var buttonValue = document.querySelector('answerbutton');
    answerQuestionOne(buttonValue)
  },

  answerQuestionOne = function(animal, buttonValue) {
    if (name == buttonValue) {
      return "string of attenUI.answerCorrectText"
    } else {
      return "string of attenUI.wrongText"
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