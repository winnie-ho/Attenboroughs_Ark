var Country = require("./country");

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
      console.log(jsonString);
      var result = JSON.parse(jsonString);
      console.log("this is the result");
      console.log(result);
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
      // console.log("HI");
      var countriesAPI = self.populateDropDownList(results);
      callback(countriesAPI);
      // console.log("allAPI complete");
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