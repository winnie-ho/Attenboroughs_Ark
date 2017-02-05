var Animal = function(options){
  this.name = options.name;
  this.country = options.country;
  this.questions = options.questions;
  this.answerText = options.answerText;
  this.image = options.image;
}

var wrongAnswerMessage = "Wrong!"

Animal.prototype = {
  getQuestionOne: function() {
    return this.questions.one;
  },
  getQuestionTwo: function() {
    return this.questions.two;
  },
  getQuestionThree: function() {
    return this.questions.three;
  },

  answerQuestionOne: function(buttonValue) {
    this.getQuestionOne();
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      return wrongAnswerMessage
    }
  },

  answerQuestionTwo: function(buttonValue) {
    this.getQuestionTwo();
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      return wrongAnswerMessage
    }
  },

    answerQuestionThree: function(buttonValue) {
    this.getQuestionThree()
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      return wrongAnswerMessage
      }
    }

    
  }



module.exports = Animal;