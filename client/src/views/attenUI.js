var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");

var AttenUI = function(){
  var attenTalk = document.querySelector("#attenTalk");
  this.buttons = document.querySelector("#control-container");
  console.log(this.buttons)
}

AttenUI.prototype = {

  goButton: function(countryObject){
    console.log(this.buttons)
    // this.buttons.style.display = "initial";
    var newCountry = {
      name: countryObject.name,
      coords: [countryObject.coords[0], countryObject.coords[1]],
      arrivalText: countryObject.arrivalText,
      stamp: countryObject.stamp
    }

    attenTalk.innerText = countryObject.arrivalText;

  },
  startText: function(){
    console.log(this.buttons)
    this.buttons.style.display = "none";
    console.log(this.buttons)
    this.startText = "Welcome. To a Journey around the globe with me, David Attenborough. \n On this journey, we are going to see some of the worlds most endangered animals, and together we shall keep a journal, taking note of these animals and the countries we find them in. \n To choose where to travel, use the dropdown bar at the top to choose a location to visit, and press 'EXPLORE'. \n Let's start our expedition!",

    attenTalk.innerText = this.startText;
  },
  wrongText: function(){
    this.wrongText = "I don't think that animal is quite right! How about another guess?";
    attenTalk.innerText = this.wrongText;
  },
  finalWrongText: function(animalObject){
    this.finalWrongText = animalObject.answerText;
    attenTalk.innerText = this.finalWrongText;
  },
  answerCorrectText: function(animalObject){
    this.answerCorrectText = animalObject.finishingText;
    attenTalk.innerText = this.answerCorrectText;
  }
}

module.exports = AttenUI;