const express = require('express');
// https://www.npmjs.com/package/express-promise-router
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../../services/passport');

// Validation
const { validateSignup, signupSchema } = require('../../validation/signup');
const { validateSignin, signinSchema } = require('../../validation/signin');

// Controllers
const UsersController = require('../../controllers/users');

// Passport JWT
const passportJWT = passport.authenticate('jwt', { session: false });

// Local auth
const passportSignIn = passport.authenticate('local', {
  session: false,
  failWithError: false
});

// Google auth
const passportGooogle = passport.authenticate('googleToken', {
  session: false
});

// Facebook auth
const passportFacebook = passport.authenticate('facebookToken', {
  session: false
});

// TEST
// const User = require("../../models/user");
// const bodyParser = require("body-parser");

// router.post("/register", (req, res) => {
//   User.findOne({ "local.email": req.body.email }).then(user => {
//     if (user) {
//       return res.status(400).json({ email: "email alread exists" });
//     } else {
//       const newUser = new User({
//         email: req.body.email,
//         passowrd: req.body.passowrd
//       });
//     }
//     newUser
//       .save()
//       .then(user => res.json(user))
//       .catch(err => console.log(err));
//   });
// });

// @reute  GET api/users/signup
// @desc   signup user
// @access Public
router
  .route('/signup')
  .post(validateSignup(signupSchema.authSchema), UsersController.signUp);

// @reute  GET api/users/signin
// @desc   signuin
// @access Public
router
  .route('/signin')
  .post(
    validateSignin(signinSchema.authSchema),
    passportSignIn,
    UsersController.signIn
  );

// @reute  GET api/users/oauth/google
// @desc   google oauth
// @access Public
router
  .route('/oauth/google')
  .post(passportGooogle, UsersController.googleOAuth);

// @reute  POST api/users/oauth/facebook
// @desc   facebook oauth
// @access Public
router
  .route('/oauth/facebook')
  .post(passportFacebook, UsersController.facebookOAuth);

// @reute  POST api/users/verify
// @desc   verify
// @access Public
router.route('/verify').post(UsersController.verify);

// @reute  POST api/users/current
// @desc   Return current user
// @access private
router.route('/current').get(passportJWT, UsersController.current);

// @reute  GET api/users/secret
// @desc   restricted
// @access private
router.route('/secret').get(passportJWT, UsersController.secret);

// @reute  GET api/users/restricted
// @desc   restrict the user
// @access private
router.route('/restricted').get(passportJWT, UsersController.restricted);

module.exports = router;
