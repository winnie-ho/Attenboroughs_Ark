var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");
var AttenUI = require("./attenUI.js");
var attenUI = new AttenUI();

var UI = function(){ 
  var goButton = document.querySelector("#go-button");
  goButton.onclick = this.handleGoButton.bind(this);


  this.countries = new Countries();

  this.countries.allAPI(function(result){
    // console.log("HI" + result);
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
    var countriesSelect = document.querySelector("#countriesList");
    // countriesSelect.innerHTML = "";
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
    attenUI.goButton(countryObject);
    // var animalButton = document.querySelector("#quiz-button")
    // console.log(animalButton);
    // animalButton.onclick = function(){
    //   attenUI.wrongText();
    // }
    // // var visitedCountry = document.createElement("img");
    // // visitedCountry.src = countryObject.stamp;
    // // visitedCountry.width = 100;
    // // visitedCountry.id = "stamp"
    // // var notebookDiv = document.querySelector("#notebook");
    // // notebookDiv.appendChild(visitedCountry);

    // var attDiv = document.querySelector("#attenborough");
    // 
    // arrivalText.innerText = countryObject.arrivalText;
    // attDiv.appendChild(arrivalText);

    // var newCountry = {
    //   name: countryObject.name,
    //   coords: [countryObject.coords[0], countryObject.coords[1]],
    //   arrivalText: countryObject.arrivalText,
    //   stamp: countryObject.stamp
    // }

    // var countries = new Countries();    
    // countries.makePost("/countries", newCountry, function(data){
    // });
    // console.log( this.map)
    // this.map.addMarker({lat: countryObject.coords[0], lng: countryObject.coords[1]});
    // document.location.reload(true);

  },

  handleResetButton: function(){

  },

  renderNotebookCountry: function(countryList){
    var visitedCountriesStamps = [];
      for (var country of countryList){
      visitedCountriesStamps.push(country.stamp);
      this.map.addMarker({lat: country.coords[0], lng: country.coords[1]});

    }

    var filterVisitedCountries = visitedCountriesStamps.filter(function(country, index, countryList){
      return visitedCountriesStamps.indexOf(country) === index;
    });

    var notebookDiv = document.querySelector("#notebook");
      for(var country of filterVisitedCountries){
        var countryVisited = document.createElement("img");
        countryVisited.src = country;
        countryVisited.width = 100;
        countryVisited.id = "stamp";
        notebookDiv.appendChild(countryVisited);

      }

  },

  handleNextButton: function(){
      var animals = new Animals();
      animals.allAPI(function(result){ 
      console.log(result);

      var selectedCountry = document.querySelector("select");
      var countryObject = JSON.parse(selectedCountry.value);
        
        for(var animal of result){
          if (animal.country === countryObject.name) {
            var animalObject = animal; 
          }
        }

      var attDiv = document.querySelector("#attenborough");
      var question = document.createElement("p");
      attDiv.innerHTML = "";
      question.innerText = animalObject.questions.one;
      console.log("animalObject", animalObject.questions.one);
      attDiv.appendChild(question);

      var notebookDiv = document.querySelector("#notebook");
      var photo = document.createElement("img");
      photo.src = animalObject.image;
      photo.width = 100;
      notebookDiv.appendChild(photo);
      });
 },

  renderMapJourney: function(){
    
  }
}

module.exports = UI;