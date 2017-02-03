var Animal = function(options){
  this.name = options.name;
  this.country = options.country;
  this.questions = options.questions;
  this.answerText = options.answerText;
  this.image = options.image;
}

Quiz.prototype = {
  getQuestionOne: function() {
    // questionsObject = animal.questions
    // for (var question of questionsObject){
      // return question.one
    // }
    return this.questions.one
  }
}

module.exports = Animal;