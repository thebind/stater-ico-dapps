const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const config = require('../config/keys');
const User = require('../models/user');

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.JWT_SECRET
    },
    async (payload, done) => {
      try {
        // Find the User specified in token
        // payload.sub from signToken
        const user = await User.findById(payload.sub);

        // If user does not exsits, handle it
        if (!user) {
          return done(null, false);
        }

        // otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// GOOGLE OAUTH STRATEGY
// CONSOLE - https://console.developers.google.com
// PLAYGROUND for developer
// https://developers.google.com/oauthplayground/
passport.use(
  'googleToken',
  new GooglePlusTokenStrategy(
    {
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('accesstoken:', accessToken);
        console.log('refreshToken:', refreshToken);
        console.log('profile:', profile);

        // Check whether this current user exists in our Database
        const existingUser = await User.findOne({ 'google.id': profile.id });
        if (existingUser) {
          console.log('User already exists in our DB');
          return done(null, existingUser);
        }

        console.log('User does not exists, we are creating');

        // If It's new account
        const newUser = new User({
          method: 'google',
          google: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// FACEBOOK OATH STRATEGY
// CONSOLE - https://developers.facebook.com
// PLAYGROUND for developer
// https://developers.facebook.com/tools/access_token
passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: config.oauth.facebook.clientID,
      clientSecret: config.oauth.facebook.clientSecret
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('profile', profile);
        console.log('accessToken', accessToken);
        console.log('refreshToken', refreshToken);

        const exsitingUser = await User.findOne({ 'facebook.id': profile.id });
        if (exsitingUser) {
          return done(null, exsitingUser);
        }

        const newUser = new User({
          method: 'facebook',
          facebook: {
            id: profile.id,
            email: profile.emails[0].value
          }
        });

        await newUser.save();
        done(null, newUser);
      } catch (error) {
        done(error, false, error.message);
      }
    }
  )
);

// LOCAL STRATEGY
passport.use(
  new LocalStrategy(
    {
      // UserSchema
      usernameField: 'email'
    },
    async (email, password, done) => {
      try {
        // Find the user given the email
        const user = await User.findOne({ 'local.email': email });

        // If not, handle it
        if (!user) {
          return done(null, false, {
            message: 'Could not find the User'
          });
        }

        // check if the password is correct
        const isMatch = await user.isValidPassword(password);
        // If not, handle it
        if (!isMatch) {
          return done(null, false, {
            message: 'Password is incorrect.'
          });
        }

        // check if the account has been verified
        if (!user.local.active) {
          return done(null, false, {
            message: 'You have to confirm the Email first!'
          });
        }
        // otherwise, return the user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
