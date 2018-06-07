// Validation Package 'Joi'
// https://github.com/hapijs/joi
// https://github.com/hapijs/joi/blob/v13.2.0/API.md#stringregexpattern-name--options
// Also check - https://github.com/hapijs/joi/issues/1380
// https://wit-hdip-computer-science.github.io/semester-2-ent-web-development/topic-09-validation/talk-2-joi-validation/joi-validation.pdf
// https://github.com/hapijs/joi/blob/v13.2.0/lib/language.js

const Joi = require('joi');

module.exports = {
  validateSignup: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, {
        abortEarly: true
      });

      if (result.error) {
        return res.status(400).json({ message: result.error.message });
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  // Password using Regular Expression
  // ^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-/:-@[-`{-~])[!-~]{8,48}
  // More than 8 char and less than 48 char
  // At least more than one Lowercase Alphabet
  // At least more than one Uppercase Alphabet
  // Alphabet and Numbers
  // At least more than one Symbols such as　!"#$%&'()*+,-./:;<=>?@[]^_`{|}~）
  signupSchema: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .error(new Error('Email must be a valid email'))
        .required(),
      password: Joi.string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-/:-@[-`{-~])[!-~]{8,48}$/,
          'Password'
        )
        .error(new Error('Fails to match the Password pattern'))
        .required()
    })
  }
};
