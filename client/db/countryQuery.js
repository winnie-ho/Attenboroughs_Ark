var MongoClient = require("mongodb").MongoClient;

var CountryQuery = function(){
  this.url = "mongodb://localhost:27017/attenboroughs_ark";
};

CountryQuery.prototype = {
  allFromAPI: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection("countries");
      console.log(collection);
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },

  addVisited: function(countryToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
      var collection = db.collection("countriesVisited");
      collection.insert(countryToAdd);
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
    };
    });
  },
  
  allVisited: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
          var collection = db.collection("countriesVisited");
          console.log("returned from countriesVisited DB", collection);
          collection.find().toArray(function(err, docs){
            onQueryFinished(docs);
      });
    });
  }
};


module.exports = CountryQuery;