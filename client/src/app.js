var UI = require("./views/ui");

var app = function() {
  var ui = new UI();
  var goButton = document.querySelector("#go-button");
  goButton.onclick = ui.handleGoButton;
}

window.onload = app;