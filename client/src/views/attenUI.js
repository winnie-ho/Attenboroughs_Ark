var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");

var AttenUI = function(){
  var attenTalk = document.querySelector("#attenTalk");
  this.buttons = document.querySelector("#control-container");
  // console.log(buttons)
}

AttenUI.prototype = {
  goButton: function(countryObject){
    this.buttons.style.display = "initial";
    var newCountry = {
      name: countryObject.name,
      coords: [countryObject.coords[0], countryObject.coords[1]],
      arrivalText: countryObject.arrivalText,
      stamp: countryObject.stamp
    }

    attenTalk.innerText = countryObject.arrivalText;

  },
  startText: function(){
    // console.log(this.buttons)
    this.buttons.style.display = "none";
    this.startText = "Welcome. To a Journey around the globe with me, David Attenborough.",

    attenTalk.innerText = this.startText;
  }
}

module.exports = AttenUI;