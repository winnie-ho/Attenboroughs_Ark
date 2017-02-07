var MongoClient = require("mongodb").MongoClient;

var AnimalQuery = function(){
  this.url = "mongodb://localhost:27017/attenboroughs_ark";
};

AnimalQuery.prototype = {
  allFromAPI: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection("animals");
      console.log(collection);
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },

  addVisited: function(animalToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
      var collection = db.collection("animalsVisited");
      collection.insert(animalToAdd);
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
    };
    });
  },

  allVisited: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
          var collection = db.collection("animalsVisited");
          console.log("returned from animalsVisited DB", collection);
          collection.find().toArray(function(err, docs){
            onQueryFinished(docs);
      });
    });
  },

  deleteVisitedAnimals: function(){
    console.log("HIT DELETE VISITED ANIMALS")
    MongoClient.connect(this.url, function(err, db){
      if (err){
        console.log("error returned", err);
      }else{
          console.log("NO ERROR IN REQ")
          var collection = db.collection("animalsVisited");
          collection.drop("animalsVisited");
          db.createCollection("animalsVisited");
        }
      });
    }

};


module.exports = AnimalQuery;