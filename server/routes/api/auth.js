const express = require('express');
// https://www.npmjs.com/package/express-promise-router
const router = require('express-promise-router')();

// Validation
const { validateAuth, authSchema } = require('../../validation/auth');

// Controllers
const AuthController = require('../../controllers/auth');

// @reute  GET api/auth/validation
// @desc   auth entry before check
// @access Public
router
  .route('/validation')
  .post(
    validateAuth(authSchema.authSchema),
    //passportSignIn,
    AuthController.validation
  );

// @reute  GET api/users/signin
// @desc   signuin
// @access Public
router
  .route('/insert')
  .post(
    validateAuth(authSchema.authSchema),
    AuthController.insert
  );

module.exports = router;
