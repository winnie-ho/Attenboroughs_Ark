var Animal = require("./animal");

var Animals = function(){

}

Animals.prototype = {
  makeRequest: function(url, callback){
    var request = new XMLHttpRequest();
    request.open("GET", url);
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

  all: function(callback){
  var self = this;

  // change the url request to the own Animals API
    this.makeRequest("http://localhost:3000/animals/api", function() {
      if (this.status !== 200){
        return;
      }
      var jsonString = this.responseText;
      var result = JSON.parse(jsonString);
      console.log(result);
      callback(result);
    });
  }, 

  allDB: function(callback){
    var self = this;
    this.makeRequest("http://localhost:3000/animals/api", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      var animalsDB = self.populateArk(results);
      callback(animalsDB);
    })
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