var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){  // var map;

  this.countries = new Countries();

  this.countries.allDB(function(result){
    this.renderNotebookCountry(result);
  }.bind(this));
  
  this.countries.all(function(result){
    this.renderCountriesList(result);
  }.bind(this));

  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 20, lng: 0 };
  var map = new MapWrapper(centre, 2);
  this.map = map;


  // var routeCoords = [
  //   {lat: 56,lng: -3},
  //   {lat: 6,lng: -30},
  //   {lat: 5,lng: 23},
  //   {lat: 62,lng: 15}
  // ];
  // var journeyPath = new google.maps.Polyline({
  //   path: routeCoords,
  //         geodesic: true,
  //         strokeColor: '#FF0000',
  //         strokeOpacity: 1.0,
  //         strokeWeight: 2
  // });

  // console.log("this is what is being produced", map);
  // journeyPath.setMap(map);

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

  renderNotebookCountry: function(countryList){
    var notebookDiv = document.querySelector("#notebook");
      for(var country of countryList){
        var countryVisited = document.createElement("p");
        countryVisited.innerText = "We have visited " + country.name;
        notebookDiv.appendChild(countryVisited);
        this.map.addMarker({lat: country.xcoord, lng: country.ycoord});
      }
  },

  renderMapJourney: function(){
    
  }
}

module.exports = UI;