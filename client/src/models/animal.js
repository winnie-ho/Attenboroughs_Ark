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

  answerQuestion: function(buttonValue) {
    if (this.name == button.value) {
      return this.answerText } 
    else if { getQuestionTwo() 
      this.name = user.input
      if (this.name2 == button.value) {
        return this.answerText}
      else if { getQuestionThree() }
        if (this.name3 == button.value) {
          return this.answerText
        }
      }
    }
  }

  //use on button press do this function, if this happens restart


module.exports = Animal;