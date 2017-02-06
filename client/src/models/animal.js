var Animal = function(options){
  this.name = options.name;
  this.country = options.country;
  this.questions = options.questions;
  this.answerText = options.answerText;
  this.image = options.image;
  this.buttonValues = options.buttonValues;
}

Animal.prototype = {
 
}

  //use on button press do this function, if this happens restart


module.exports = Animal;