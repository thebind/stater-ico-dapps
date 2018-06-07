const Joi = require('joi');

module.exports = {
  validateSignin: schema => {
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

  signinSchema: {
    authSchema: Joi.object().keys({
      email: Joi.string()
        .email()
        .error(new Error('Email & Password does not match'))
        .required(),
      password: Joi.string()
        .error(new Error('Email & Password does not match'))
        .required()
    })
  }
};
