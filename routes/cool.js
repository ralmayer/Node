var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('cool', {message: 'Ur so cool', message2: 'you did it baby'});
});

module.exports = router;