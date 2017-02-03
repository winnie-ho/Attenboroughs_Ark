var Country = require("./country");

var Countries = function(){

}

Countries.prototype = {
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

  // change the url request to the own Countries API
    this.makeRequest("http://localhost:3000/countries/api", function() {
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
    this.makeRequest("http://localhost:3000/countries/api", function(){
      if(this.status !== 200) return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      var countriesDB = self.populateDropDownList(results);
      callback(countriesDB);
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