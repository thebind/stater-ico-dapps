// Validation Package 'Joi'
// https://github.com/hapijs/joi
// https://github.com/hapijs/joi/blob/v13.2.0/API.md#stringregexpattern-name--options
// Also check - https://github.com/hapijs/joi/issues/1380
// https://wit-hdip-computer-science.github.io/semester-2-ent-web-development/topic-09-validation/talk-2-joi-validation/joi-validation.pdf
// https://github.com/hapijs/joi/blob/v13.2.0/lib/language.js

const Joi = require('joi');

module.exports = {
  validateAuth: schema => {
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
  authSchema: {
    authSchema: Joi.object().keys({
      name: Joi.string()
        .error(new Error('Name must be required'))
        .required(),
      address: Joi.string()
        .error(new Error('Address must be required'))
        .required(),
      birth: Joi.string()
        .error(new Error('Birth must be required'))
        .required(),
      country: Joi.string()
        .error(new Error('Country must be required'))
        .required(),
      passport: Joi.string()
        .error(new Error('Passport must be required'))
        .required(),
      certificateResidence: Joi.string()
        .error(new Error('Certificate of Residence must be required'))
        .required(),
      picture: Joi.string()
        .error(new Error('Picture must be required'))
        .required(),
      ethereumAddress: Joi.string()
        .error(new Error('EthereumAddress must be required'))
        .required(),
      aml: Joi.boolean()
        .error(new Error('AML(anti-money laundering)? must be Checked'))
        .valid(true)
        .required(),
      terms: Joi.boolean()
        .error(new Error('We confirmed PiaceCoin Terms must be Checked'))
        .valid(true)
        .required(),
      userid: Joi.string().required()
    })
  }
};
