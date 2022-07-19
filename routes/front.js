var express = require('express');
var router = express.Router();
const auth = require('../middleware/AuthMiddleware');
const { createNewsletter } = require('../controllers/NewsletterController');

/* GET users listing. */
router.get('/myaccount', function (req, res, next) {
    res.render('front/myaccount', { message: req.flash('message'), errors: req.flash('errors') });
});

router.get('/wishlist', auth, function (req, res, next) {
    res.render('front/wishlist', { message: req.flash('message'), errors: req.flash('errors') });
});
router.get('/cart', auth, function (req, res, next) {
    res.render('front/cart', { message: req.flash('message'), errors: req.flash('errors') });
});
router.get('/checkout', auth, function (req, res, next) {
    res.render('front/checkout', { message: req.flash('message'), errors: req.flash('errors') });
});
router.post('/newsletter', auth, function (req, res, next) {
    createNewsletter(req, res);
});



module.exports = router;
