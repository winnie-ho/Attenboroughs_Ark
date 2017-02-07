var Countries = require("../models/countries.js");
var Country = require("../models/country.js");
var Animals = require("../models/animals.js");
var Animal = require("../models/animal.js");
var MapWrapper = require("../models/mapWrapper.js");

var AttenUI = require("./attenUI.js");
var QuizUI = require("./quizUI.js");
var attenUI = new AttenUI();
var quizUI = new QuizUI();
// var QuizUI = new QuizUI();

var UI = function(){ 
  var goButton = document.querySelector("#go-button");
  goButton.onclick = this.handleGoButton.bind(this);


  var resetButton = document.querySelector("#reset-button");
  resetButton.onclick = this.handleResetButton.bind(this);

  this.countries = new Countries();
  this.animals = new Animals();

  this.countries.allAPI(function(result){
    this.renderCountriesList(result);
  }.bind(this));

  
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
    var animals = new Animals();
    // console.log(this);
    var animalObject = null;

    animals.allAPI(function(animalsAPI){ 
      for(var animal of animalsAPI){
        if (animal.country === countryObject.name) {
          animalObject = animal;
        }
      }
    });

    var nextButton = document.querySelector("#next-button");
      // nextButton.onclick = ui.handleNextButton();
      // console.log("1")
      nextButton.onclick = function(){
        quizUI.createAnswerButtons(animalObject);
        quizUI.changeAttenTalk(animalObject);
        // console.log("3")

    ////////////Question Buttons

    var answerButton = document.querySelectorAll(".animalNameButton");
        // console.log(answerButton)

        var answerButtonsClickBehavour = function() {
          var firedButton = this.innerText;
          // console.log(firedButton)
          quizUI.answerQuestion(animalObject, firedButton);
        }

        for (var i = 0; i < answerButton.length; i++) {
          answerButton[i].onclick = answerButtonsClickBehavour;
        }
      }


    // add country to countriesVisited collection in db
    this.addCountryToDb(function(){
      var countries = new Countries;
      countries.allVisited(function(result){
        self.renderNotebookCountry(result);
      }.bind(this));
    });

    // add animal to animalsVisited collection in db
    this.addAnimalToDb(function(){
      var animals = new Animals;
      animals.allVisited(function(result){
        self.renderNotebookAnimal(result);
      }.bind(this));
    });    

    // pan to the selected country on the map
    this.map.panTo(countryObject.coords[0], countryObject.coords[1]);

    
    // attenUI.goButton(countryObject);

    // // initiate arrival text
    // var attDiv = document.querySelector("#attenborough");
    // attDiv.innerHTML = "";
    // var arrivalText = document.createElement("p");
    // arrivalText.innerText = countryObject.arrivalText;
    // attDiv.appendChild(arrivalText);

  },

  addAnimalToDb: function(callback){
    var selectedCountry = document.querySelector("#selector");
    var countryObject = JSON.parse(selectedCountry.value);
    var animals = new Animals();

    var animalObject = null;

    animals.allAPI(function(animalsAPI){ 
      for(var animal of animalsAPI){
        if (animal.country === countryObject.name) {
          animalObject = animal;
        }
      }
    });

    animals.allVisited(function(animalsVisited){
      if (animalsVisited.length === 0){
            // add animal to animalsVisited collection in db
            var newAnimal = {
              name: animalObject.name,
              country: animalObject.country,
              questions: animalObject.questions,
              answerText: animalObject.answerText,
              image: animalObject.image,
              finishingText: animalObject.finishingText
            }

            animals.makePost("/animals", newAnimal, function(data){
              console.log("new animals added to db", newAnimal.name);
            }); 
          }
        });

    animals.allVisited(function(animalsVisited){
      var matches = 0;
      var arrayLength = animalsVisited.length
      for(var animal of animalsVisited){
        if (animal.name !== animalObject.name) {
          matches ++;
        }
      }

      if (matches === arrayLength){
        console.log(animalObject.name + " has been visited before. Not added to DB");
            // add country to countriesVisited collection in db
            var newAnimal = {
              name: animalObject.name,
              country: animalObject.country,
              questions: animalObject.questions,
              answerText: animalObject.answerText,
              image: animalObject.image,
              finishingText: animalObject.finishingText
            }
            animals.makePost("/animals", newAnimal, function(data){
            });
          }
        }); 
    callback(); 
  },

  addCountryToDb: function(callback){
    var selectedCountry = document.querySelector("#selector");
    var countryObject = JSON.parse(selectedCountry.value);
    var countries = new Countries;
    countries.allVisited(function(countriesVisited){
      if (countriesVisited.length === 0){
        // add country to countriesVisited collection in db
        var newCountry = {
          name: countryObject.name,
          coords: [countryObject.coords[0], countryObject.coords[1]],
          arrivalText: countryObject.arrivalText,
          countryFlag: countryObject.countryFlag
        }
        countries.makePost("/countries", newCountry, function(data){
        });
      };
    });

    countries.allVisited(function(countriesVisited){
      var matches = 0;
      var arrayLength = countriesVisited.length;

      for(var country of countriesVisited){
        if (country.name !== countryObject.name){
          matches ++ ;
        }
      }

      if(matches === arrayLength){
          // add country to countriesVisited collection in db
          var newCountry = {
            name: countryObject.name,
            coords: [countryObject.coords[0], countryObject.coords[1]],
            arrivalText: countryObject.arrivalText,
            countryFlag: countryObject.countryFlag
          }
          countries.makePost("/countries", newCountry, function(data){
          });
        }       
      }); 
    callback(); 
  },

  renderNotebookCountry: function(countryList){
    // filtering out the unique visited countries for flags and markers(may have been visited more than once).
    console.log("countryList", countryList);

    var visitedCountriesFlags = [];
    for (var country of countryList){
     visitedCountriesFlags.push(country.countryFlag);
     var marker = this.map.addMarker({lat: country.coords[0], lng: country.coords[1]});

         // add the info window to the map
         this.map.addInfoWindow(this.map, marker, country.name);
       }

       var filterVisitedCountries = visitedCountriesFlags.filter(function(country, index, countryList){
         return visitedCountriesFlags.indexOf(country) === index;
       });

       //filling the notebook with visitedCountries flags
       var notebookFlags = document.querySelector("#flagsDiv");
       notebookFlags.innerHTML = "";
       for(var country of filterVisitedCountries){
         var countryVisited = document.createElement("img");
         countryVisited.src = country;
         countryVisited.width = 100;
         countryVisited.id = "flag";
         notebookFlags.appendChild(countryVisited);
       }

       //add the polyline to the map
       var pathCoords = [];
       for (var country of countryList){
         pathCoords.push({lat: country.coords[0], lng: country.coords[1]});
       } 
       this.map.addPolyline(pathCoords);
     },

     renderNotebookAnimal: function(animalList){
      // filtering out the unique visited animals for photos (may have been visited more than once).
      var visitedAnimals = [];
      for (var animal of animalList){
       visitedAnimals.push(animal);
     }
     console.log("animals visited", visitedAnimals);

     var filterVisitedAnimals = visitedAnimals.filter(function(animal, index, animalList){
       return visitedAnimals.indexOf(animal) === index;
     });

         //filling the notebook with visitedAnimals images
         var notebookPhotos = document.querySelector("#photosDiv");
         notebookPhotos.innerHTML = "";
         for(var animal of filterVisitedAnimals){
           var animalNote = document.createElement("h5");
           animalNote.innerText = animal.name + "\n";
           var photo = document.createElement("img");
           photo.id = "photo"
           photo.src = animal.image;
           notebookPhotos.appendChild(animalNote);
           animalNote.appendChild(photo);
         }
       },

       handleResetButton: function(){
        window.location.reload();
        var self = this;

        this.countries.makeDeleteRequest("/countries", function(){
          console.log("countriesVisited dropped");
          var countries = new Countries;
          countries.allVisited(function(result){
            self.renderNotebookCountry(result);
          }.bind(this));
        });

        this.animals.makeDeleteRequest("/animals", function(){
          console.log("animalsVisited dropped");
          var animals = new Animals;
          animals.allVisited(function(result){
            self.renderNotebookAnimal(result);
          }.bind(this));
        });
      }
    }

    module.exports = UI;