// Json Web Token
// URL: https://jwt.io/
//      https://github.com/auth0/node-jsonwebtoken
const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/keys');
const randomstring = require('randomstring');
const mailer = require('../services/mailer/mailer');
const verifyHtml = require('../services/mailer/template/verifyHtml');
const config = require('../config/mailer');

signToken = user => {

  console.log('user -> ' + user);

  return JWT.sign(
    {
      iss: 'thebind',
      sub: user.id,
      iat: new Date().getTime(), // Current Time
      exp: new Date().setDate(new Date().getDate() + 1) // Current time + 1 day ahead
    },
    JWT_SECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    // Check if there is a user with the same mail
    const foundUser = await User.findOne({ 'local.email': email });
    if (foundUser) {
      return res.status(400).json({
        error: 'Email is already in use'
      });
    }

    // Generate Rondom Token for email confirmation
    const secretToken = randomstring.generate();

    // creae a new user
    const newUser = new User({
      method: 'local',
      local: {
        email: email,
        password: password,
        active: false,
        secretToken: secretToken
      }
    });
    await newUser.save();

    // Compose message & Send the Email
    const message = {
      from: config.MAIL_SENDER,
      to: newUser.local.email,
      subject: 'Please, Please Verify your email!',
      html: verifyHtml(newUser)
    };
    await mailer.sendEmail(message);

    res
      .status(200)
      .json({ message: 'Entry Success, Please verify your email.' });
  },

  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      token: token,
      userid: req.user.id
    });
  },

  googleOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      token: token
    });
  },

  facebookOAuth: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      success: true,
      token: token
    });
  },

  secret: async (req, res, next) => {
    res.json({
      secret:
        'You are succesfully logied in, now secret resouce could be handled'
    });
  },

  current: async (req, res, next) => {
    res.json({
      id: req.user.id,
      email: req.user.local.email
    });
  },

  restricted: async (req, res, next) => {
    res.json({
      restricted: 'restricted resouce could be handled'
    });
  },

  verify: async (req, res, next) => {
    const { secretToken } = req.body;
    const user = await User.findOne({ 'local.secretToken': secretToken });

    if (!user) {
      return res.status(403).json({
        error: 'Secret Token not found'
      });
    }

    // Activate Account
    user.local.active = true;

    await user.save();

    res.status(200).json({
      message: 'Account is Successfuly Verified!'
    });
  }
};
