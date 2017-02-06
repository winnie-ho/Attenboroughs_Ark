var express = require('express');
var app = express();
var countryRouter = express.Router();

var Country = require('../client/src/models/country');
var countries = require("../client/src/models/countries");
var CountryQuery = require("../client/db/countryQuery.js");
var query = new CountryQuery();

// API index
countryRouter.get('/countries/api', function(req, res) {
  query.allFromAPI(function(results){
    res.json(results);
  })
});

// index
countryRouter.get('/countries', function(req, res) {
  query.allVisited(function(results){
    res.json(results);
  })
});

//add new visited country to notebook
countryRouter.post('/countries', function(req, res) {
  var country = new Country({
    name: req.body.name,
    coords: req.body.coords,
    arrivalText: req.body.arrivalText,
    countryFlag: req.body.countryFlag,
  });
  query.addVisited(country, function(results){
    // res.json(results);
    res.redirect("/");
  })
});


//delete visited countries to reset the app
countryRouter.delete('/countries', function(req, res) {
  query.deleteVisitedCountries();
  countries.splice(req.params.id, 1);
  res.json({data: countries});
});


//--------may not need to use the following functions:

//country by id
countryRouter.get('/countries/:id', function(req, res){
  res.json(countries[req.params.id]);
});


//country update
countryRouter.put('/countries/:id', function(req, res) {
  var country = new Country({
    name: req.body.name,
    capital: req.body.capital
  });
  countries[req.params.id] = country;
  res.json({data: countries});
});

//delete specific country
countryRouter.delete('/countries/:id', function(req, res) {
  countries.splice(req.params.id, 1);
  res.json({data: countries});
});


module.exports = countryRouter;
