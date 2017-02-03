var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){ 
  this.countries = new Countries();

  this.countries.allAPI(function(result){
    this.renderCountriesList(result);
  }.bind(this));

  this.countries.allVisited(function(result){
    this.renderNotebookCountry(result);
  }.bind(this));
  

  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 20, lng: 0 };
  this.map = new MapWrapper(centre, 2);


  var routeCoords = [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ];

  var journeyPath = new google.maps.Polyline({
    path: routeCoords,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
  });

  console.log("this is what is being produced", this.map);
  // journeyPath.setMap(map);

  // this.map = map;
  // this.renderMapJourney();

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
      arrivalText: countryObject.arrivalText
    }

    console.log("country added to log: ", countryObject.name);
    var countries = new Countries();    
    countries.makePost("/countries", newCountry, function(data){
    });

    document.location.reload(true);

  },

  renderNotebookCountry: function(countryList){
    var notebookDiv = document.querySelector("#notebook");
      for(var country of countryList){
        var countryVisited = document.createElement("p");
        countryVisited.innerText = "We have visited " + country.name;
        notebookDiv.appendChild(countryVisited);
        this.map.addMarker({lat: country.coords[0], lng: country.coords[1]});
      }
  },

  renderMapJourney: function(){
    
  }
}

module.exports = UI;