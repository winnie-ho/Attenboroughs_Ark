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
	var QuizUI = __webpack_require__(9);
	var Animals = __webpack_require__(4);
	
	var animal = null;
	
	var app = function() {
	  var ui = new UI();
	
	
	  var attenUI = new AttenUI();
	  var quizUI = new QuizUI();
	
	  // var animals = new Animals();
	  // animals.allAPI(function(result){ 
	  //   animal = result[0];
	  //   // console.log(animal.buttonValues)
	  // })
	
	  attenUI.startText();
	
	
	//   var nextButton = document.querySelector("#next-button");
	//   // nextButton.onclick = ui.handleNextButton();
	//   // console.log("1")
	//   nextButton.onclick = function(){
	//     quizUI.createAnswerButtons(animal);
	//     quizUI.changeAttenTalk(animal);
	//     // console.log("3")
	
	// ////////////Question Buttons
	
	//     var answerButton = document.querySelectorAll(".animalNameButton");
	//     // console.log(answerButton)
	
	//     var answerButtonsClickBehavour = function() {
	//       var firedButton = this.innerText;
	//       // console.log(firedButton)
	//       quizUI.answerQuestion(animal, firedButton);
	//     }
	
	//     for (var i = 0; i < answerButton.length; i++) {
	//       answerButton[i].onclick = answerButtonsClickBehavour;
	//     }
	//   }
	
	
	  var answerQuestionOne = document.querySelector(".animalNameButton");
	  answerQuestionOne.onclick = quizUI.answerQuestionOne();
	
	
	  var mountainSounds = document.querySelector("#savannah")
	  mountainSounds.play();
	
	  
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
	    // var icon = {
	    //     url: "/resources/Plane-icon.png",
	    //     scaledSize: new google.maps.Size(40, 40),
	    //     origin: new google.maps.Point(0, 10),
	    //     anchor: new google.maps.Point(30, 10)
	    // };
	
	    var marker = new google.maps.Marker({
	      position: coords,
	      // icon: icon,
	      map: this.googleMap
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
	       strokeWeight: 1,
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
	      strokeWeight: 2,
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
	  },
	
	  addInfoWindow: function(map, marker, contentString){
	    var infoWindow = new google.maps.InfoWindow({
	          content: contentString
	        });
	      marker.addListener("click", function(){
	      infoWindow.open(this.googleMap, marker);
	    })
	  }
	
	  // geoLocate: function(runArray){
	
	  //   console.log(runArray);
	  //   navigator.geolocation.getCurrentPosition(function(position) {
	  //     var centre = {lat: position.coords.latitude, lng: position.coords.longitude}; 
	  //     this.googleMap.setCenter(centre); 
	  //     var marker = this.addMarker(centre);
	  //     var nearRuns = document.querySelector("#near-runs");
	  //     this.addInfoWindow(this.googleMap, marker, "You Are Here")
	  //     for (var run of runArray){
	  //       if (Math.sqrt(Math.pow((run.start_latlng[0] - position.coords.latitude),2))< 0.005){
	  //         var runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
	  //         this.addInfoWindow(this.googleMap, runMarker, run.name);
	  //         var nearRunsInfo = document.createElement("p");
	  //         nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
	  //         nearRuns.appendChild(nearRunsInfo);
	  //         var division = document.createElement("hr");
	  //         nearRuns.appendChild(division);
	  //         console.log(run.start_latlng[0])
	  //         console.log(position.coords.latitude);
	  //         console.log(run.start_latlng[0]-position.coords.latitude)
	  //         console.log(run.name + "added");
	
	  //       } else if (Math.sqrt(Math.pow((run.start_latlng[1] - position.coords.longitude),2)) < 0.005){
	  //         var runMarker = this.addMarker({lat: run.start_latlng[0], lng: run.start_latlng[1]});
	  //         this.addInfoWindow(this.googleMap, runMarker, run.name);
	  //         var nearRunsInfo = document.createElement("p");
	  //         nearRunsInfo.innerText = run.name + " | " + ((run.distance/1000).toFixed(2)) + "km";
	  //         nearRuns.appendChild(nearRunsInfo);
	  //         var division = document.createElement("hr");
	  //         nearRuns.appendChild(division);
	  //         console.log(run.start_latlng[1])
	  //         console.log(position.coords.longitude);
	  //         console.log(run.start_latlng[1]-position.coords.longitude);
	  //         console.log(run.name + "added");
	  //       }
	  //     }
	  //   }.bind(this)); 
	  // }
	
	
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
	  // console.log(this.buttons)
	}
	
	AttenUI.prototype = {
	  goButton: function(countryObject){
	    // console.log(this.buttons)
	
	    attenTalk.innerText = countryObject.arrivalText;
	
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
	    this.reasoningText = "The reason for our expedition, is that animals are going extinct faster and faster, there are species your grandparents may have seen, which you will never get the chance to! This is mostly because of towns and cities getting bigger, and taking up the spaces where the animals used to make home. If we don't do something about this, your grandchilderen might not have many animals to learn about and see!";
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
	var UI = __webpack_require__(1);
	
	var counter = 0;
	var finalQuestion = false;
	
	var QuizUI = function(){
	
	  // var next = document.querySelector("#next-button");
	  // nextButton.onclick = this.handleNextButton.bind(this);
	}
	
	QuizUI.prototype = {
	  createAnswerButtons: function(animal){
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
	    counter ++;
	    questionsObject = animal.questions;
	    // console.log(questionsObject);
	    if (counter == 1) {
	      attenTalk.innerText = questionsObject.one;
	    }
	    else if (counter == 2) {
	      attenTalk.innerText = questionsObject.two;
	    } 
	    else if (counter == 3) {
	      attenTalk.innerText = questionsObject.three
	      finalQuestion = true;
	    }
	    else { console.log("finished!")
	    addAnimalToDb();
	    }
	  },
	
	  answerQuestion: function(animal, button) {
	    attenUI = new AttenUI();
	    if (animal.name === button && !finalQuestion) {
	      attenUI.answerCorrectText(animal);
	      // addAnimalToDb();
	      // renderNotebookAnimal();
	    } else if (animal.name !== button && !finalQuestion){
	      
	      attenUI.wrongText();
	
	      // console.log(this)
	      // this.changeAttenTalk(animal);
	      // console.log("string of attenUI.wrongText");
	    } else if (animal.name !== button && finalQuestion){
	      attenUI.finalWrongText(animal);
	    } else if (animal.name === button && finalQuestion){
	      attenUI.answerCorrectText(animal);
	    }
	  }
	}
	
	
	module.exports = QuizUI;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Countries = __webpack_require__(2);
	var Country = __webpack_require__(3);
	var Animals = __webpack_require__(4);
	var Animal = __webpack_require__(5);
	var AttenUI = __webpack_require__(7);
	var UI = __webpack_require__(1);
	
	var counter = 0;
	var finalQuestion = false;
	
	var QuizUI = function(){
	
	  // var next = document.querySelector("#next-button");
	  // nextButton.onclick = this.handleNextButton.bind(this);
	}
	
	QuizUI.prototype = {
	  createAnswerButtons: function(animal){
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
	    counter ++;
	    questionsObject = animal.questions;
	    // console.log(questionsObject);
	    if (counter == 1) {
	      attenTalk.innerText = questionsObject.one;
	    }
	    else if (counter == 2) {
	      attenTalk.innerText = questionsObject.two;
	    } 
	    else if (counter == 3) {
	      attenTalk.innerText = questionsObject.three
	      finalQuestion = true;
	    }
	    else { console.log("finished!")
	    addAnimalToDb();
	    }
	  },
	
	  answerQuestion: function(animal, button) {
	    attenUI = new AttenUI();
	    if (animal.name === button && !finalQuestion) {
	      attenUI.answerCorrectText(animal);
	      // addAnimalToDb();
	      // renderNotebookAnimal();
	    } else if (animal.name !== button && !finalQuestion){
	      
	      attenUI.wrongText();
	
	      // console.log(this)
	      // this.changeAttenTalk(animal);
	      // console.log("string of attenUI.wrongText");
	    } else if (animal.name !== button && finalQuestion){
	      attenUI.finalWrongText(animal);
	    } else if (animal.name === button && finalQuestion){
	      attenUI.answerCorrectText(animal);
	    }
	  }
	}
	
	
	module.exports = QuizUI;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map