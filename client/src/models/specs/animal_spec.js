var Animal = require('../animal');
var assert = require('assert');

describe('Animal', function() {
  var animal;

  beforeEach(function() {
  panda = new Animal({
  name: "Giant Panda",
  country: "China",
  questions: {
    one: "this animal seems to be Black and White.",
    two: "this animal eats almost only bamboo!",
    three: "this animal appears to be a species of bear!"
  },
  answerText: "I seem to remember coming across this vast creature upon my previous travels in the mountains of central China, It seems to be a Giant Panda! Let's take them back to our boat to take care",
  image: "http://multimedia.scmp.com/widgets/jia-jia/images/JiaJia.png"
    });
  });

  it('should get question one', function() {
    assert.equal(panda.getQuestionOne(), "this animal seems to be Black and White.");
  });
  it('should get question two', function() {
    assert.equal(panda.getQuestionTwo(), "this animal eats almost only bamboo!");
  });
  it('should get question three', function() {
    assert.equal(panda.getQuestionThree(), "this animal appears to be a species of bear!");
  });
  it('should get answerText', function() {
    assert.equal(panda.answerQuestionOne("Giant Panda"), "I seem to remember coming across this vast creature upon my previous travels in the mountains of central China, It seems to be a Giant Panda! Let's take them back to our boat to take care");
  });
});
