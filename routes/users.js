var express = require('express');
var router = express.Router();
const { registerUser, loginUser, logoutUser, loginUserModal, getUserSession } = require('../controllers/UserController');
const { body, check, validationResult } = require('express-validator');
const UserModel = require('../models/UserModel');
const app = require('../app');


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',
  [body('email').isEmail().normalizeEmail(),
  body('name').not().isEmpty().trim().escape(),
  body('password').not().isEmpty().trim().escape(),
  body('confirmPassword').not().isEmpty().trim().escape(),
  body('mobile').not().isEmpty().trim().escape(),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('Password must contain a number'),

  ],
  function (req, res, next) {
    const errors = validationResult(req);
    if (errors.length > 0) {
      req.flash('errors', errors);
      res.redirect('/front/myaccount');
    }
    registerUser(req, res);
  });

router.post('/login', function (req, res, next) {
  loginUser(req, res);
});

router.post('/modal/login', function (req, res, next) {
  loginUserModal(req, res)
});


router.get('/logout', function (req, res) {
  logoutUser(req, res);
});

router.get('/session', function (req, res) {
  let user_session = getUserSession(req, res);

  return user_session;
})

module.exports = router;
