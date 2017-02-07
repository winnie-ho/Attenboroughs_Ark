var MasterUI = function(){
  var UI = require("./ui");
  var attenUI = require("./attenUI");
  var quizUI = require("./quizUI");

  ui = new UI();
  attenUI = new attenUI();
  quizUI = new quizUI();
}

module.exports = MasterUI;