var MongoClient = require("mongodb").MongoClient;

var AnimalQuery = function(){
  this.url = "mongodb://localhost:27017/attenboroughs_ark";
};

AnimalQuery.prototype = {
  allFromdb: function(onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      var collection = db.collection("animals");
      console.log(collection);
      collection.find().toArray(function(err, docs){
        onQueryFinished(docs);
      });
    });
  },
  //onQueryFinished is used as doing a simple return would be stuck inside the connection function. The onQueryFinished function is a shortcut to return the information that you are wanting. In this case it is the information on films.

  //App is unlikely to use the add query function
  add: function(animalToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
      var collection = db.collection("animals");
      collection.insert(animalToAdd);
      collection.find().toArray(function(err, docs){
        console.log(docs);
        onQueryFinished(docs);
      });
    };
    });
  }
};


module.exports = AnimalQuery;