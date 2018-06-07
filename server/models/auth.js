const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const authSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  _id: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  birth: {
    type: String,
  },
  country: {
    type: String,
  },
  passport: {
    type: String,
  },
  certificateResidence: {
    type: String,
  },
  picture: {
    type: String,
  },
  ethereumAddress: {
    type: String,
  },
  aml: {
    type: String,
  },
  terms: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const Auth = mongoose.model('auth', authSchema);

// Export the model
module.exports = Auth;
