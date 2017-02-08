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

var UI = function(map){ 
  // document.innerHTML = ""
  var goButton = document.querySelector("#go-button");
  goButton.onclick = this.handleGoButton.bind(this);

  // var africaSound = document.querySelector("#savannah")
  // africaSound.play();

  var resetButton = document.querySelector("#reset-button");
  resetButton.onclick = this.handleResetButton.bind(this);

  this.countries = new Countries();
  this.animals = new Animals();

  this.countries.allAPI(function(result){
    this.renderCountriesList(result);
  }.bind(this));




this.animals.allVisited(function(result){
  this.renderNotebookAnimal(result);
}.bind(this));


this.countries.allVisited(function(result){
  this.renderNotebookCountry(result);
}.bind(this));

}

UI.prototype = {
  addHereToDB: function(){
    var countries = new Countries;
    countries.allVisited(function(countriesVisited){
      if (countriesVisited.length === 0){

        navigator.geolocation.getCurrentPosition(function(position) {
        // add dummy country "here" to countriesVisited collection in db
        var here = {
          name: "here",
          coords: [position.coords.latitude, position.coords.longitude],
          arrivalText: "",
          countryFlag: ""
        }

        countries.makePost("/countries", here, function(data){
        });
      });
      }
    })
  },

  renderCountriesList: function(countriesAPI){

    var countriesSelect = document.querySelector("#selector");
    countriesSelect.innerHTML = ""

    var unselectable = document.createElement("option");
    unselectable.innerText = "Country:"
    unselectable.disabled = true;
    unselectable.selected = true;
    countriesSelect.appendChild(unselectable);

    for (var country of countriesAPI){
      var countryChoice = document.createElement("option");
      countryChoice.innerText = country.name;
      countryChoice.value = JSON.stringify(country);
      countriesSelect.appendChild(countryChoice);
    }
  },

  handleGoButton: function(){
    var selectedCountry = document.querySelector("#selector");
    var countryObject = JSON.parse(selectedCountry.value);
    var self = this;
    attenUI.goButton(countryObject)
    var animals = new Animals();
    var animalObject = null;

    animals.allAPI(function(animalsAPI){ 
      for(var animal of animalsAPI){
        if (animal.country === countryObject.name) {
          animalObject = animal;
        }
      }
    });

    var nextButton = document.querySelector("#next-button");
    var buttonDiv = document.querySelector("#QButtons");
    buttonDiv.style.visibility = "hidden";
    nextButton.style.visibility = "visible";
    nextButton.onclick = function(){
      console.log("hi there")
      quizUI.createAnswerButtons(animalObject);
      quizUI.changeAttenTalk(animalObject);

    ////////////Question Buttons

    var answerButton = document.querySelectorAll(".animalNameButton");

    var answerButtonsClickBehavour = function() {
      var firedButton = this.innerText;
      buttonDiv.style.visibility = "hidden";
      nextButton.style.visibility = "visible";
          // console.log(firedButton)
          quizUI.answerQuestion(animalObject, firedButton);

        }

        for (var i = 0; i < answerButton.length; i++) {
          answerButton[i].onclick = answerButtonsClickBehavour;
        }
      }

///Audio

var myAudio = document.getElementById("myAudio");
var isPlaying = false;

var togglePlay = function(countryObject) {
  if (isPlaying) {
    myAudio.stop()
  }
  switch (countryObject.name) {
    case "West Africa":
    document.getElementById("myAudio").src="../resources/savannah.mp3";
    myAudio.play();
    break;
    case "China":
    document.getElementById("myAudio").src="../resources/mountainsOfChina.mp3";
    myAudio.play();
    break;
  }
}

togglePlay(countryObject);

myAudio.onplaying = function() {
  isPlaying = true;
};
myAudio.onpause = function() {
  isPlaying = false;
};

    // add country to countriesVisited collection in db
    this.addCountryToDb(function(){
      var countries = new Countries;
      countries.allVisited(function(result){
        self.renderNotebookCountry(result);
      }.bind(this));
    });

    // pan to the selected country on the map
    map.panTo(countryObject.coords[0], countryObject.coords[1]);

  },

  addAnimalToDb: function(animalObject, callback){
    // var selectedCountry = document.querySelector("#selector");
    // var countryObject = JSON.parse(selectedCountry.value);
    var animals = new Animals();

    var animalObject = animalObject;

    // animals.allAPI(function(animalsAPI){ 
    //   for(var animal of animalsAPI){
    //     if (animal.country === countryObject.name) {
    //       animalObject = animal;
    //     }
    //   }
    // });

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
     var marker = map.addMarker({lat: country.coords[0], lng: country.coords[1]});

         // add the info window to the map
         map.addInfoWindow(this.map, marker, "<h2>" + country.name + "</h2>");
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
       map.addPolyline(pathCoords);
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