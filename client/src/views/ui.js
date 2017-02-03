var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){
  this.countries = new Countries();

  this.countries.allDB(function(result){
    this.renderNotebook(result);
  }.bind(this));
  
  this.countries.all(function(result){
    this.renderCountriesList(result);
  }.bind(this));

  mapDiv = document.querySelector("#mapDiv");
  mapDiv.innerHTML = "";
  var centre = {lat: 20, lng: 0 };
  this.map = new MapWrapper(centre, 2);
}

UI.prototype = {
  renderCountriesList: function(countriesList){
    var countriesDiv = document.querySelector("#countries");
    var selectLabel = document.createElement("h3");
    selectLabel.innerText = "SELECT A COUNTRY: "
    var countriesSelect = document.createElement("select");
      for (var country of countriesList){
        var place = document.createElement("option");
        place.innerText = country.name;
        place.value = JSON.stringify(country);

        countriesDiv.appendChild(selectLabel);
        selectLabel.appendChild(countriesSelect);
        countriesSelect.appendChild(place);
      }
    console.log(this.map);
  },

  handleGoButton: function(){
    var selectedCountry = document.querySelector("select");
    var countryObject = JSON.parse(selectedCountry.value);
    var visitedCountry = document.createElement("p");
    visitedCountry.innerText = "We are off to " + countryObject.name + "! Buckle Up!";
    var notebookDiv = document.querySelector("#notebook");
    notebookDiv.appendChild(visitedCountry);
     
    var newCountry = {
      name: countryObject.name,
      capital: countryObject.capital,
      xcoord: countryObject.latlng[0],
      ycoord: countryObject.latlng[1]
    }

    console.log("country added to log: ", countryObject.name);
    var countries = new Countries();    
    countries.makePost("/countries", newCountry, function(data){
    });

    document.location.reload(true);
  },

  renderNotebook: function(countryList){
    var notebookDiv = document.querySelector("#notebook");
      for(var country of countryList){
        var countryVisited = document.createElement("p");
        countryVisited.innerText = "We have visited " + country.name;
        notebookDiv.appendChild(countryVisited);
        console.log(country);
        this.map.addMarker({lat: country.xcoord, lng: country.ycoord});
      }
  }
}

module.exports = UI;