var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){ 
  var goButton = document.querySelector("#go-button");
  goButton.onclick = this.handleGoButton.bind(this);

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

  // console.log("this is what is being produced", this.map);
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
    var visitedCountry = document.createElement("img");
    console.log(countryObject.stamp);
    visitedCountry.src = countryObject.stamp;
    visitedCountry.width = 60;
    var notebookDiv = document.querySelector("#notebook");
    notebookDiv.appendChild(visitedCountry);

    var newCountry = {
      name: countryObject.name,
      coords: [countryObject.coords[0], countryObject.coords[1]],
      arrivalText: countryObject.arrivalText,
      stamp: countryObject.stamp
    }

    var countries = new Countries();    
    countries.makePost("/countries", newCountry, function(data){
    });

    this.map.addMarker({lat: countryObject.coords[0], lng: countryObject.coords[1]});
    // document.location.reload(true);
  },

  renderNotebookCountry: function(countryList){

    var visitedCountriesNames = [];
      for (var country of countryList){
      visitedCountriesNames.push(country.name);
      this.map.addMarker({lat: country.coords[0], lng: country.coords[1]});
    }


    var filterVisitedCountries = visitedCountriesNames.filter(function(country, index, countryList){
      return visitedCountriesNames.indexOf(country) === index;
    });

    console.log("filterVisitedCountries", filterVisitedCountries);
    var notebookDiv = document.querySelector("#notebook");
      for(var country of filterVisitedCountries){
        var countryVisited = document.createElement("p");
        countryVisited.innerText = "We have visited " + country;
        notebookDiv.appendChild(countryVisited);
      }
  },

  renderMapJourney: function(){
    
  }
}

module.exports = UI;