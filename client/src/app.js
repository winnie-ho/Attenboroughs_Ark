var UI = require("./views/ui");

var app = function() {
  var ui = new UI();
  var goButton = document.querySelector("#go-button");
  goButton.onclick = ui.handleGoButton;
  // var mountainSounds = document.querySelector("#savannah")
  // mountainSounds.play();
}

window.onload = app;