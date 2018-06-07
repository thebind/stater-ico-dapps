const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// https://www.npmjs.com/package/randomstring
// const randomstring = require('randomstring');

const Schema = mongoose.Schema;

// Create a Schema
const usersSchema = new Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    },
    active: {
      type: Boolean
    },
    secretToken: {
      type: String
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  }
});

usersSchema.pre('save', async function(next) {
  try {
    if (this.method !== 'local') {
      next();
    }

    if (!this.local.active) {
      // Generate a salt
      const salt = await bcrypt.genSalt(10);

      // Generate a password hash (salt + hash)
      const passwordHash = await bcrypt.hash(this.local.password, salt);

      // Re-asign hashed version over original, plain text password
      this.local.password = passwordHash;
    }

    next();
  } catch (error) {
    next(error);
  }
});

usersSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};

// Create a model
const User = mongoose.model('user', usersSchema);

// Export the model
module.exports = User;
