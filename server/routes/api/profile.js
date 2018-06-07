const express = require('express');
const router = require('express-promise-router')();
const mongoose = require('mongoose');
const passport = require('passport');
const passportConf = require('../../services/passport');

// Controllers
const ProfilesController = require('../../controllers/profiles');

// Passport JWT
const passportJWT = passport.authenticate('jwt', { session: false });

// Validation
const { validateProfile, profileSchema } = require('../../validation/profile');

// @reute  GET api/profile/test
// @desc   Tests profile route
// @access Public
router.get('/test', (req, res) =>
  res.json({ msg: 'The profile router works' })
);

// @reute  GET api/profile/secret
// @desc   restricted
// @access Private
router.route('/secret').get(passportJWT, ProfilesController.secret);

// @reute  GET api/profile/
// @desc   Get user profile
// @access private
router.route('/').get(passportJWT, ProfilesController.getProfileByUserId);

// @reute  POST api/profile
// @desc   Create user profile
// @access Private
router
  .route('/')
  .post(
    passportJWT,
    validateProfile(profileSchema.profileCheck),
    ProfilesController.createProfile
  );

// @reute  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Private
router
  .route('/user/:user_id')
  .get(passportJWT, ProfilesController.getProfileByUserId);

module.exports = router;
