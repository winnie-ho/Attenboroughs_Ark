var Animal = function(options){
  this.name = options.name;
  this.country = options.country;
  this.questions = options.questions;
  this.answerText = options.answerText;
  this.image = options.image;
}

Animal.prototype = {
  getQuestionOne: function() {
    return this.questions.one
  }
}

module.exports = Animal;