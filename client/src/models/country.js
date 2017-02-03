var Country = function(options){
  this.name = options.name;
  this.country = options.capital;
  this.questions = options.xcoord;
  this.ycoord = options.ycoord;
}

Country.prototype = {

}

module.exports = Country;