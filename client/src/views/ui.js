var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){
  this.countries = new Countries();

  this.countries.allDB(function(result){
    this.renderArk(result);
  }.bind(this));
  
  this.countries.all(function(result){
    this.render(result);
  }.bind(this));

  mapDiv = document.querySelector("#mapDiv");
  mapDiv.innerHTML = "";
  var centre = {lat: 20, lng: 0 };
  this.map = new MapWrapper(centre, 2);
}

UI.prototype = {
  render: function(countriesList){
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
    var addedCountry = document.createElement("p");
    addedCountry.innerText = "Country: " + countryObject.name + "\n Capital: " + countryObject.capital;
    var arkDiv = document.querySelector("#ark");
    arkDiv.appendChild(addedCountry);
     
    var newCountry = {
      name: countryObject.name,
      capital: countryObject.capital,
      xcoord: countryObject.latlng[0],
      ycoord: countryObject.latlng[1]
    }

    console.log("country added to bucket list: ", countryObject.name);
    var countries = new Countries();    
    countries.makePost("/", newCountry, function(data){
    });

    document.location.reload(true);
  },

  handleQuestionOneButton: function(){
    var nextButton = document.querySelector("#next-button");
  }

  handleNextButton: function(){
    var nextButton = document.querySelector("#next-button");
  }

  renderArk: function(bucketList){
    var arkDiv = document.querySelector("#ark");
      for(var country of bucketList){
        var arkCountry = document.createElement("p");
        arkCountry.innerText = "Country: " + country.name + "\n Capital: " + country.capital;
        arkDiv.appendChild(arkCountry);
        console.log("Country in the loop:", country.name);
        console.log(this.map);
        this.map.addMarker({lat: country.xcoord, lng: country.ycoord});
      }
  }

}

module.exports = UI;