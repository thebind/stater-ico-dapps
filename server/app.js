const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Routes for Models
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const auth = require('./routes/api/auth');

// Express Instance
const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Promise
mongoose.Promise = global.Promise;

// Mongodb Connect
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
if (!process.env.NODE_ENV === 'test') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
if (process.env.NODE_ENV === 'playground') {
  // app.use('/api/users/signin', function(req, res) {
  //   res.send('Response from app.use');
  // });
} else {
  app.use('/api/users', users);
  app.use('/api/profile', profile);
  app.use('/api/posts', posts);
  app.use('/api/auth', auth);
}

module.exports = app;

//https://jwt.io/
//https://github.com/auth0/node-jsonwebtoken
