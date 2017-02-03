var Quiz = require('../quiz');
var assert = require('assert');

describe('Quiz', function() {
  var quiz;

  beforeEach(function() {
  quiz = new Quiz({
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
    assert.equal(quiz.getQuestionOne(quiz), "this animal seems to be Black and White.");
  });
});
