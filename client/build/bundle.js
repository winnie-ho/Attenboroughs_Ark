/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var UI = __webpack_require__(1);
	var AttenUI = __webpack_require__(7);
	var QuizUI = __webpack_require__(8);
	var Animals = __webpack_require__(4);
	var MapWrapper = __webpack_require__(6);
	
	var animal = null;
	
	var app = function() {
	
	  //creates the map
	  mapDiv = document.querySelector("#mapDiv");
	  var centre = {lat: 56, lng: -3 };
	  this.map = new MapWrapper(centre, 3);
	  this.map.geoLocate();
	
	  var ui = new UI(this.map);
	  ui.addHereToDB();
	
	  var attenUI = new AttenUI();
	  var quizUI = new QuizUI();
	
	  attenUI.startText();
	  
	}
	
	window.onload = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Countries = __webpack_require__(2);
	var Country = __webpack_require__(3);
	var Animals = __webpack_require__(4);
	var Animal = __webpack_require__(5);
	var MapWrapper = __webpack_require__(6);
	
	
	var AttenUI = __webpack_require__(7);
	var QuizUI = __webpack_require__(8);
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Country = __webpack_require__(3);
	
	var Countries = function(){
	
	}
	
	Countries.prototype = {
	  makeRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("GET", url, false);
	    request.onload = callback;
	    request.send();
	  },
	
	  makePost: function(url, newData, callback){
	    var data = JSON.stringify(newData);
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-type", "application/json");
	    request.onload = callback;
	    request.send(data);
	  },
	
	  makeDeleteRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("DELETE", url);
	    request.setRequestHeader("Content-type", "application/json");
	    request.onload = callback;
	    request.send();
	  },
	
	  allVisited: function(callback){
	  var self = this;
	    this.makeRequest("http://localhost:3000/countries", function() {
	      if (this.status !== 200)
	        return;      
	      var jsonString = this.responseText;
	      var result = JSON.parse(jsonString);
	      callback(result);
	    });
	  }, 
	
	  allAPI: function(callback){
	    var self = this;
	    this.makeRequest("http://localhost:3000/countries/api", function(){
	      if(this.status !== 200) 
	        return;
	      var jsonString = this.responseText;
	      var results = JSON.parse(jsonString);
	      var countriesAPI = self.populateDropDownList(results);
	      callback(countriesAPI);
	    })
	  },
	
	  populateDropDownList: function(results){
	    var Countries = [];
	    for (var result of results){
	      var country = new Country (result);
	    Countries.push(country);
	    }
	    return Countries;
	  }
	
	}
	
	module.exports = Countries;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var Country = function(options){
	  this.name = options.name;
	  this.coords = options.coords;
	  this.arrivalText = options.arrivalText;
	  this.countryFlag = options.countryFlag;
	}
	
	Country.prototype = {
	
	}
	
	module.exports = Country;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Animal = __webpack_require__(5);
	
	var Animals = function(){
	
	}
	
	Animals.prototype = {
	  makeRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("GET", url, false);
	    request.onload = callback;
	    request.send();
	  },
	
	  makePost: function(url, newData, callback){
	    console.log("makePost started");
	    var data = JSON.stringify(newData);
	    var request = new XMLHttpRequest();
	    request.open("POST", url);
	    request.setRequestHeader("Content-type", "application/json");
	    request.onload = callback;
	    request.send(data);
	  },
	
	  makeDeleteRequest: function(url, callback){
	    var request = new XMLHttpRequest();
	    request.open("DELETE", url);
	    request.setRequestHeader("Content-type", "application/json");
	    request.onload = callback;
	    request.send();
	  },
	
	  allVisited: function(callback){
	    var self = this;
	    this.makeRequest("http://localhost:3000/animals", function(){
	      if(this.status !== 200) return;
	      var jsonString = this.responseText;
	      var results = JSON.parse(jsonString);
	      var animalsDB = self.populateAnimalsList(results);
	      callback(animalsDB);
	    })
	  },
	
	  allAPI: function(callback){
	  var self = this;
	    this.makeRequest("http://localhost:3000/animals/api", function() {
	      if (this.status !== 200){
	        return;
	      }
	      var jsonString = this.responseText;
	      var result = JSON.parse(jsonString);
	      callback(result);
	    });
	  }, 
	
	  populateAnimalsList: function(results){
	    var animals = [];
	    for (var result of results){
	      var animal = new Animal (result);
	    animals.push(animal);
	    }
	    return animals;
	  }
	
	}
	
	module.exports = Animals;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var Animal = function(options){
	  this.name = options.name;
	  this.country = options.country;
	  this.questions = options.questions;
	  this.answerText = options.answerText;
	  this.image = options.image;
	  this.buttonValues = options.buttonValues;
	}
	
	Animal.prototype = {
	 
	}
	
	  //use on button press do this function, if this happens restart
	
	
	module.exports = Animal;

/***/ },
/* 6 */
/***/ function(module, exports) {

	var MapWrapper = function(coords, zoom) {
	  var container = document.querySelector("#mapDiv");
	    this.googleMap = new google.maps.Map(container, {
	    center: coords,
	    zoom: zoom
	    });
	}
	
	
	MapWrapper.prototype = {
	  addMarker: function(coords){
	    var marker = new google.maps.Marker({
	      position: coords,
	      map: this.googleMap,
	      animation: google.maps.Animation.DROP
	    });
	    console.log("marker added");
	    return marker;
	  },
	
	  addPolyline: function(pathCoords){
	    var lineSymbol = {
	       path: "M43.734,21c-3.631,0-15.092,0-15.092,0  S16.25,5.188,16.047,4.938s-0.422-0.594-1.125-0.672c-0.859-0.095-1.969-0.203-2.328-0.234c-0.406-0.035-0.719,0.141-0.496,0.734  C12.388,5.539,18.748,21,18.748,21H6.034c0,0-2.458-4.722-2.878-5.531C2.965,15.101,2.557,15.014,2,15H1.297  c-0.125,0-0.312,0-0.281,0.344C1.058,15.811,3,25,3,25s-1.888,9.197-1.984,9.656C0.953,34.953,1.172,35,1.297,35H2  c0.966-0.009,0.954-0.079,1.156-0.469C3.576,33.722,6.034,29,6.034,29h12.714c0,0-6.36,15.461-6.65,16.234  c-0.223,0.594,0.09,0.77,0.496,0.734c0.359-0.031,1.469-0.139,2.328-0.234c0.703-0.078,0.922-0.422,1.125-0.672S28.643,29,28.643,29  s11.461,0,15.092,0c3.766,0,5.264-3.031,5.264-4S47.484,21,43.734,21z",
	
	       anchor: new google.maps.Point(50,25),
	       scale: 0.7,
	       strokeColor: "red",
	       fillColor: "red",
	       fillOpacity: 1,
	       strokeWeight: 0.5,
	       rotation: 270
	     };
	
	    var iconPlane = {
	        icon: lineSymbol,
	        offset: '100%'
	      };
	
	    var line = new google.maps.Polyline({
	      path: pathCoords,
	      geodesic: true,
	      strokeColor: '#FF0000',
	      strokeOpacity: 1.0,
	      strokeWeight: 1,
	      icons: [iconPlane],
	      map: this.googleMap
	    });
	
	    line.setMap(this.googleMap);
	    this.animateFlight(line, pathCoords, lineSymbol);
	  },
	
	  animateFlight: function(line, pathCoords, lineSymbol) {
	      var count = 0;
	      window.setInterval(function() {
	        count = (count + 1) % 200;
	
	        var icons = line.get('icons');
	        icons[0].offset = (count / 2) + '%';
	        line.set('icons', icons);
	    }, 20);
	  },
	
	  panTo: function(lat, lng){
	    this.googleMap.panTo(new google.maps.LatLng(lat,lng));
	    this.googleMap.setZoom(2);
	  },
	
	  addInfoWindow: function(map, marker, contentString){
	    var infoWindow = new google.maps.InfoWindow({
	          content: contentString,
	        });
	      marker.addListener("click", function(){
	      infoWindow.open(this.googleMap, marker);
	    })
	  },
	
	  geoLocate: function(){
	    navigator.geolocation.getCurrentPosition(function(position) {
	      var centre = {lat: position.coords.latitude, lng: position.coords.longitude}; 
	      this.googleMap.setCenter(centre); 
	      var marker = this.addMarker(centre);
	
	      var infoWindow = new google.maps.InfoWindow({
	            content: "<h2>Home</h2>",
	          });
	
	
	      // var infoWindow = this.addInfoWindow(this.googleMap, marker, "<h2>Home</h2>");
	      infoWindow.open(this.googleMap, marker);
	    }.bind(this));
	  }
	}
	
	module.exports = MapWrapper;
	


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Countries = __webpack_require__(2);
	var Country = __webpack_require__(3);
	var Animals = __webpack_require__(4);
	var Animal = __webpack_require__(5);
	var MapWrapper = __webpack_require__(6);
	
	var AttenUI = function(){
	  var attenTalk = document.querySelector("#attenTalk");
	  this.buttons = document.querySelector("#control-container");
	}
	
	AttenUI.prototype = {
	  goButton: function(countryObject){
	    attenTalk.innerText = countryObject.arrivalText;
	  },
	
	  initiateQuestions: function(){
	    this.initiateText = "I think I hear an animal up ahead, Why don't you help me work out what it is by using the buttons which will appear below?";
	    attenTalk.innerText = this.initiateText;
	  },
	
	  startText: function(){
	    this.startText = "Welcome. To a Journey around the globe with me, David Attenborough. \n On this journey, we are going to see some of the worlds most endangered animals, and together we shall keep a journal, taking note of these animals and the countries we find them in. \n To choose where to travel, use the dropdown bar at the top to choose a location to visit, and press 'EXPLORE'. \n Let's start our expedition!",
	
	    attenTalk.innerText = this.startText;
	  },
	
	  wrongText: function(){
	    this.wrongText = "I don't think that animal is quite right! How about another guess?";
	    attenTalk.innerText = this.wrongText;
	  },
	
	  reasoningText: function(){
	    this.reasoningText = "The reason for our expedition, is that animals are going extinct faster and faster, there are species your grandparents may have seen, which you will never get the chance to! \n This is mostly because of towns and cities getting bigger, and taking up the spaces where the animals used to make home. \n If we don't do something about this, your grandchilderen might not have many animals to learn about and see!";
	    attenTalk.innerText = this.reasoningText;
	  },
	
	  finalWrongText: function(animalObject){
	    this.finalWrongText = animalObject.answerText;
	    attenTalk.innerText = this.finalWrongText;
	  },
	  
	  answerCorrectText: function(animalObject){
	    this.answerCorrectText = animalObject.finishingText;
	    attenTalk.innerText = this.answerCorrectText;
	  }
	}
	
	module.exports = AttenUI;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	var Countries = __webpack_require__(2);
	var Country = __webpack_require__(3);
	var Animals = __webpack_require__(4);
	var Animal = __webpack_require__(5);
	var AttenUI = __webpack_require__(7);
	var counter = 0;
	var finalQuestion = false;
	
	
	var QuizUI = function(){
	
	}
	
	QuizUI.prototype = {
	  createAnswerButtons: function(animal){
	    // console.log(AttenUI)
	    var buttonDiv = document.querySelector("#QButtons");
	    buttonDiv.innerHTML = "";
	
	    var qAnswers = animal.buttonValues;
	
	    for (var answer of qAnswers) {
	      var answerButtons = document.querySelector("#QButtons");
	      var answerButton = document.createElement("button");
	      answerButton.id = "answerButton";
	      answerButton.classList.add("animalNameButton");
	      answerButton.innerText = answer;
	      answerButtons.appendChild(answerButton);
	    }
	  },
	
	  changeAttenTalk: function(animal) {
	
	    attenUI = new AttenUI();
	    var buttonDiv = document.querySelector("#QButtons");
	    var nextButton = document.querySelector("#next-button");
	    counter ++;
	    questionsObject = animal.questions;
	    // console.log(questionsObject);
	    if(counter === 1){
	      attenUI.initiateQuestions();
	    }
	    else if (counter === 2) {
	      nextButton.style.visibility = "hidden";
	      buttonDiv.style.visibility = "visible";
	      attenTalk.innerText = questionsObject.one;
	    }
	    else if (counter === 3) {
	      nextButton.style.visibility = "hidden";
	      buttonDiv.style.visibility = "visible";
	      attenTalk.innerText = questionsObject.two;
	    } 
	    else if (counter === 4) {
	      nextButton.style.visibility = "hidden";
	      buttonDiv.style.visibility = "visible";
	      attenTalk.innerText = questionsObject.three
	      finalQuestion = true;
	    }
	    else { console.log("finished!")
	    // addAnimalToDb();
	    }
	  },
	
	  answerQuestion: function(animal, button) {
	    var UI = __webpack_require__(1);
	    var nextButton = document.querySelector("#next-button");
	    var attenUI = new AttenUI();
	    var ui = new UI();
	    // console.log("this" + this)
	
	  // console.log(ui)
	    console.log(AttenUI)
	    if (animal.name === button && !finalQuestion) {
	      attenUI.answerCorrectText(animal);
	      // nextButton.style.visibility = "hidden";
	    console.log("correct 1 2")
	      ui.addAnimalToDb(animal, function(){
	        // console.log("Here I am")
	        var animals = new Animals;
	        animals.allVisited(function(result){
	          // console.log("Here" + ui)
	          ui.renderNotebookAnimal(result);
	        });
	      }); 
	      counter = 0; 
	    } else if (animal.name !== button && !finalQuestion){
	    // counter ++;
	      attenUI.wrongText();
	    } else if (animal.name !== button && finalQuestion){
	
	      attenUI.finalWrongText(animal);
	      nextButton.style.visibility = "hidden";
	  // console.log("all wrong")
	      ui.addAnimalToDb(animal, function(){
	        // console.log("Here I am")
	        var animals = new Animals;
	        animals.allVisited(function(result){
	          // console.log("Here" + ui)
	          ui.renderNotebookAnimal(result);
	        });
	      });  
	  counter = 0;
	  finalQuestion = false;
	    } else if (animal.name === button && finalQuestion){
	
	      attenUI.answerCorrectText(animal);
	      nextButton.style.visibility = "hidden";
	  // console.log("correct 3")
	      ui.addAnimalToDb(animal, function(){
	        // console.log("Here I am")
	        var animals = new Animals;
	        animals.allVisited(function(result){
	          // console.log("Here" + ui)
	          ui.renderNotebookAnimal(result);
	        });
	      });  
	  counter = 0;
	  finalQuestion = false;
	    }
	  }
	}
	
	
	module.exports = QuizUI;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map