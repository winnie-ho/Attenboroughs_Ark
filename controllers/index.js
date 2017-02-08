var express = require('express');
var router = express.Router();
var path = require('path');


router.use(require('./countries'));
router.use(require('./animals'));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});


module.exports = router;