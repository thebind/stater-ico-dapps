const Joi = require('joi');
const helper = require('./helper');

module.exports = {
  validateProfile: schema => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema, {
        abortEarly: false
      });

      if (result.error) {
        const validation = helper.validationErrorMessage(result.error.details);
        return res.status(400).json({
          validation: validation
        });
      }

      if (!req.value) {
        req.value = {};
      }
      req.value['body'] = result.value;
      next();
    };
  },

  profileSchema: {
    profileCheck: Joi.object().keys({
      firstName: Joi.string()
        .min(1)
        .max(48)
        .required()
        .options({
          language: {
            string: {
              min: 'more than 2 char',
              max: 'less than 48 char'
            }
          }
        }),
      lastName: Joi.string()
        .min(1)
        .max(48)
        .required()
        .options({
          language: {
            string: {
              min: 'more than 2 char',
              max: 'less than 48 char'
            }
          }
        })
    })
  }
};
