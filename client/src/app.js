var UI = require("./views/ui");

var app = function() {
  var ui = new UI();
  var goButton = document.querySelector("#go-button");
  var nextButton = document.querySelector("#next-button");
  goButton.onclick = ui.handleGoButton;
  nextButton.onclick = ui.handleNextButton;
}

window.onload = app;