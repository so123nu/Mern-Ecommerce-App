var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('front/index', { title: "Ecommerce App", message: req.flash('message'), errors: req.flash('errors') });
});





module.exports = router;
