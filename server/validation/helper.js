// @desc   Filter Key Value Object
// @Parms  Object, Key
// @Return { key: message }
module.exports.filterBy = function(obj, key) {
  var result = Object.keys(obj).reduce(function(r, e) {
    if (e.toLowerCase().indexOf(key) != -1) {
      r[e] = obj[e];
    } else {
      Object.keys(obj[e]).forEach(function(k) {
        if (k.toLowerCase().indexOf(key) != -1) {
          var object = {};
          object[k] = obj[e][k];
          r[e] = object;
        }
      });
    }
    return r;
  }, {});
  return result;
};

// @desc   Return Error Object
// @Parms  Object.error.details from Joi.validate return Object
// @Return { key: message }
module.exports.validationErrorMessage = function(obj) {
  let validation = {};
  Object.keys(obj).forEach(function(index) {
    validation[obj[index].context.key] = obj[index].message;
  });
  return validation;
};
