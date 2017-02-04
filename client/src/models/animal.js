var Animal = function(options){
  this.name = options.name;
  this.country = options.country;
  this.questions = options.questions;
  this.answerText = options.answerText;
  this.image = options.image;
}

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
      // this.wrongAnswerMessage
      // this.nextButtonAppearss
    }
  },

  answerQuestionTwo: function(buttonValue) {
    this.getQuestionTwo();
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      return
    }
  },

    answerQuestionThree: function(buttonValue) {
    this.getQuestionThree()
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      return "You're an idiot"
      }
    }
  }

  //use on button press do this function, if this happens restart


module.exports = Animal;