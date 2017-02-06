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


    })
  },

  populateBucketList: function(results){
    var blCountries = [];
    for (var result of results){
      var country = new Country (result);
      blCountries.push(country);
    }
    return blCountries;
  }

}

module.exports = Countries;