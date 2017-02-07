var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");

var AttenUI = require("./attenUI.js");
var attenUI = new AttenUI();
// var QuizUI = new QuizUI();

var UI = function(){ 
  var goButton = document.querySelector("#go-button");
  goButton.onclick = this.handleGoButton.bind(this);


  var resetButton = document.querySelector("#reset-button");
  resetButton.onclick = this.handleResetButton.bind(this);

  this.countries = new Countries();
  // this.animals = new Animals();

  

  this.countries.allAPI(function(result){
    this.renderCountriesList(result);
  }.bind(this));

  // this.countries.allVisited(function(result){
  //   this.renderNotebookCountry(result);
  // }.bind(this));

  
//creates the map
  mapDiv = document.querySelector("#mapDiv");
  var centre = {lat: 20, lng: 0 };
  this.map = new MapWrapper(centre, 2);
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
    var self = this;
    attenUI.goButton(countryObject)
    console.log(this);
    this.addCountryToDb(function(){

      var countries = new Countries;
      countries.allVisited(function(result){
        self.renderNotebookCountry(result);
      }.bind(this));

    });


  this.map.panTo(countryObject.coords[0], countryObject.coords[1]);

    
    // attenUI.goButton(countryObject);

    //add the country marker to the map
    // this.map.addMarker({lat: countryObject.coords[0], lng: countryObject.coords[1]});
        
    // // initiate arrival text
    // var attDiv = document.querySelector("#attenborough");
    // attDiv.innerHTML = "";
    // var arrivalText = document.createElement("p");
    // arrivalText.innerText = countryObject.arrivalText;
    // attDiv.appendChild(arrivalText);

    //add animal to animalsVisited collection in db
    //     var animals = new Animals();
    //     animals.allAPI(function(animalsAPI){ 
    //       for(var animal of animalsAPI){
    //         if (animal.country === countryObject.name) {
    //           var animalObject = animal;
    //         }
    //       }

    //       var newAnimal = {
    //         name: animalObject.name,
    //         country: animalObject.country,
    //         questions: animalObject.questions,
    //         answerText: animalObject.answerText,
    //         image: animalObject.image,
    //         finishingText: animalObject.finishingText
    //       }

    //       animals.makePost("/animals", newAnimal, function(data){
    //         console.log("new animals added to db", newAnimal);
    //       });    
    // })
    
  },

  addCountryToDb: function(callback){
    var selectedCountry = document.querySelector("#selector");
    var countryObject = JSON.parse(selectedCountry.value);
    var countries = new Countries;
    countries.allVisited(function(countriesVisited){
        if (countriesVisited.length === 0){
          console.log("adding first country to DB started");

          // add country to countriesVisited collection in db
          var newCountry = {
            name: countryObject.name,
            coords: [countryObject.coords[0], countryObject.coords[1]],
            arrivalText: countryObject.arrivalText,
            countryFlag: countryObject.countryFlag
          }

          countries.makePost("/countries", newCountry, function(data){
          });
          console.log("adding first country to DB finished");
        };

      for(var country of countriesVisited){
        if (country.name === countryObject.name) {
          console.log(countryObject.name + " has been visited before. Not added to DB");
        }else if (countryObject.name !== country.name){
          // add country to countriesVisited collection in db
          var newCountry = {
            name: countryObject.name,
            coords: [countryObject.coords[0], countryObject.coords[1]],
            arrivalText: countryObject.arrivalText,
            countryFlag: countryObject.countryFlag
          }

          countries.makePost("/countries", newCountry, function(data){
          });
          console.log(newCountry.name, "has been added to db");
        }
      }        
    }); 
    console.log("added to DB, start callback to render");
    callback(); 
  },

  renderNotebookCountry: function(countryList){

    // filtering out the unique visited countries for flags and markers(may have been visited more than once).
    console.log("countryList", countryList);

    var visitedCountriesFlags = [];

      for (var country of countryList){
      visitedCountriesFlags.push(country.countryFlag);
      var marker = this.map.addMarker({lat: country.coords[0], lng: country.coords[1]});
      console.log("flags", visitedCountriesFlags);

      // add the info window to the map
      this.map.addInfoWindow(this.map, marker, country.name);
    }

    var filterVisitedCountries = visitedCountriesFlags.filter(function(country, index, countryList){
      return visitedCountriesFlags.indexOf(country) === index;
    });

    //filling the notebook with visitedCountries flags
    var notebookDiv = document.querySelector("#notebook");
    notebookDiv.innerHTML = "";
      for(var country of filterVisitedCountries){
        var countryVisited = document.createElement("img");
        countryVisited.src = country;
        countryVisited.width = 100;
        countryVisited.id = "flag";
        notebookDiv.appendChild(countryVisited);
      }

    //add the polyline to the map
    var pathCoords = [];
      for (var country of countryList){
        pathCoords.push({lat: country.coords[0], lng: country.coords[1]});
      } 
    this.map.addPolyline(pathCoords);
  },

  handleResetButton: function(){
    this.countries.makeDeleteRequest("/countries", function(){
      console.log("visited countries collection has been dropped");
    });
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
      var animalNote = document.createElement("h5");
      animalNote.innerText = animalObject.name + "\n";
      var photo = document.createElement("img");
      photo.id = "photo"
      photo.src = animalObject.image;
      notebookDiv.appendChild(animalNote);
      animalNote.appendChild(photo);
      });
 }
}

module.exports = UI;