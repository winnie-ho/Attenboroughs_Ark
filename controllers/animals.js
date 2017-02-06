var express = require('express');
var app = express();
var animalRouter = express.Router();

var Animal = require('../client/src/models/animal');
var animals = require("../client/src/models/animals");
var AnimalQuery = require("../client/db/animalQuery.js");
var query = new AnimalQuery();

// API index
animalRouter.get('/animals/api', function(req, res) {
  query.allFromAPI(function(results){
    res.json(results);
  })
});

// index
animalRouter.get('/animals', function(req, res) {
  query.allVisited(function(results){
    res.json(results);
  })
});

//add new visited animal to notebook
animalRouter.post('/animals', function(req, res) {
  var animal = new Animal({
    name: req.body.name,
    country: req.body.country,
    questions: req.body.questions,
    answerText: req.body.answerText,
    image: req.body.image,
    finishingText: req.body.finishingText
  });
  query.addVisited(animal, function(results){
    // res.json(results);
    res.redirect("/");
  })
});

//delete visited animals to reset the app
animalRouter.delete('/animals', function(req, res) {
  query.deleteVisitedAnimals();
  countries.splice(req.params.id, 1);
  res.json({data: animals});
});


//--------may not need to use the following functions:

//animal by id
animalRouter.get('/animals/:id', function(req, res){
  res.json(animals[req.params.id]);
});


//animal update
animalRouter.put('/animals/:id', function(req, res) {
  var animal = new Animal({
    name: req.body.name,
    country: req.body.country,
    questions: req.body.questions,
    answerText: req.body.answerText,
    image: req.body.image
  });
  animals[req.params.id] = animal;
  res.json({data: countries});
});


//delete specific animal
animalRouter.delete('/animals/:id', function(req, res) {
  countries.splice(req.params.id, 1);
  res.json({data: countries});
});


module.exports = animalRouter;
