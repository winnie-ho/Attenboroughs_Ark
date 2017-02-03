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

  allVisited: function(callback){
    // console.log("allVisited started");
  var self = this;
    this.makeRequest("http://localhost:3000/countries", function() {
      if (this.status !== 200)
        return;      
      var jsonString = this.responseText;
      var result = JSON.parse(jsonString);
      // console.log("from visited db", result);
      callback(result);
      // console.log("allVisited complete");
    });
  }, 

  allAPI: function(callback){
    // console.log("allAPI started");
    var self = this;
    this.makeRequest("http://localhost:3000/countries/api", function(){
      if(this.status !== 200) 
        return;
      var jsonString = this.responseText;
      var results = JSON.parse(jsonString);
      // console.log("from API result", results);
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