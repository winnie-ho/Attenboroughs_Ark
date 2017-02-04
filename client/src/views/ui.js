var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");

var UI = function(){ 
  var goButton = document.querySelector("#go-button");
  goButton.onclick = this.handleGoButton.bind(this);

  this.countries = new Countries();
  this.animals = new Animals();

  this.countries.allAPI(function(result){
    this.renderCountriesList(result);
  }.bind(this));

  this.countries.allVisited(function(result){
    this.renderNotebookCountry(result);
  }.bind(this));
  
//creates the map
  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 20, lng: 0 };
  this.map = new MapWrapper(centre, 2);

//Creates the map polyline
  // var routeCoords = [
  //   {lat: 37.772, lng: -122.214},
  //   {lat: 21.291, lng: -157.821},
  //   {lat: -18.142, lng: 178.431},
  //   {lat: -27.467, lng: 153.027}
  // ];

  // var journeyPath = new google.maps.Polyline({
  //   path: routeCoords,
  //         geodesic: true,
  //         strokeColor: '#FF0000',
  //         strokeOpacity: 1.0,
  //         strokeWeight: 2
  // });

  // console.log("this is what is being produced", this.map);
  // journeyPath.setMap(this.map);

  // this.renderMapJourney();

}

UI.prototype = {
  renderCountriesList: function(countriesAPI){
    var countriesDiv = document.querySelector("#countries");
    var selectLabel = document.createElement("h3");
    selectLabel.innerText = "SELECT A COUNTRY: ";
    var countriesSelect = document.createElement("select");
    countriesSelect.id = "selector";
      for (var country of countriesAPI){
        var countryChoice = document.createElement("option");
        countryChoice.innerText = country.name;
        countryChoice.value = JSON.stringify(country);
        countriesDiv.appendChild(selectLabel);
        selectLabel.appendChild(countriesSelect);
        countriesSelect.appendChild(countryChoice);
      }
  },

  handleGoButton: function(){
    var selectedCountry = document.querySelector("#selector");
    var countryObject = JSON.parse(selectedCountry.value);

    //add the country stamp to notebook
    var visitedCountry = document.createElement("img");
    visitedCountry.src = countryObject.stamp;
    visitedCountry.width = 100;
    visitedCountry.id = "stamp"
    var notebookDiv = document.querySelector("#notebook");
    // notebookDiv.innerHTML = "";
    notebookDiv.appendChild(visitedCountry);
    
    // var countries = new Countries();
    // countries.allVisited(function(countriesVisited){ 
    //   for(var country of countriesVisited){
    //     if (country.name !== countryObject.name) {
    //     }
    //   }
    // })

    // initiate arrival text
    var attDiv = document.querySelector("#attenborough");
    attDiv.innerHTML = "";
    var arrivalText = document.createElement("p");
    arrivalText.innerText = countryObject.arrivalText;
    attDiv.appendChild(arrivalText);

    // add country to countriesVisited collection in db
    var newCountry = {
      name: countryObject.name,
      coords: [countryObject.coords[0], countryObject.coords[1]],
      arrivalText: countryObject.arrivalText,
      stamp: countryObject.stamp
    }

    this.countries.makePost("/countries", newCountry, function(data){
    });

    //add the country marker to the map
    this.map.addMarker({lat: countryObject.coords[0], lng: countryObject.coords[1]});

    //add animal to animalsVisited collection in db
    var animals = new Animals();
    animals.allAPI(function(animalsAPI){ 
      for(var animal of animalsAPI){
        if (animal.country === countryObject.name) {
          var animalObject = animal;
        }
      }

      var newAnimal = {
        name: animalObject.name,
        country: animalObject.country,
        questions: animalObject.questions,
        answerText: animalObject.answerText,
        image: animalObject.image,
        finishingText: animalObject.finishingText
      }

      animals.makePost("/animals", newAnimal, function(data){
        console.log("new animals added to db", newAnimal);
      });
    });
    // document.location.reload(true);
  },

  renderNotebookCountry: function(countryList){
    // filtering out the unique visited countries for stamps and markers(may have been visited more than once).
    var visitedCountriesStamps = [];
      for (var country of countryList){
      visitedCountriesStamps.push(country.stamp);
      this.map.addMarker({lat: country.coords[0], lng: country.coords[1]});
    }

    var filterVisitedCountries = visitedCountriesStamps.filter(function(country, index, countryList){
      return visitedCountriesStamps.indexOf(country) === index;
    });

    //filling the notebook with visitedCountries stamps
    var notebookDiv = document.querySelector("#notebook");
      for(var country of filterVisitedCountries){
        var countryVisited = document.createElement("img");
        countryVisited.src = country;
        countryVisited.width = 100;
        countryVisited.id = "stamp";
        notebookDiv.appendChild(countryVisited);
      }
  },

  handleResetButton: function(){

  },

  //this is a test, this should be in LM's attenbourgh's UI file.
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