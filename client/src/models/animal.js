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
  }

  answerQuestion: function(buttonValue, nextQuestion) {
    getQuestionOne();
    if (this.name == buttonValue) {
      return this.answerText
    } else {
      nextQuestion
      }
    }
  }

  //use on button press do this function, if this happens restart


module.exports = Animal;