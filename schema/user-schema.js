const Joi = require("joi");
const PasswordComplexity = require("joi-password-complexity");

function registerSchema(user) {
  const schema = Joi.object({
    email: Joi.string().trim().lowercase().required().email(),
    firstName: Joi.string().required(),
    otherNames: Joi.string().required(),
    address: Joi.string().required(),
    password: new PasswordComplexity({
      min: 8,
      max: 25,
      lowercase: 1,
      uppercase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
  });

  const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(user, options);
}

function loginSchema(user) {
  schema = Joi.object({
    email: Joi.string().trim().lowercase().required().email(),
    password: new PasswordComplexity({
      min: 8,
      max: 25,
      lowercase: 1,
      uppercase: 1,
      numeric: 1,
      symbol: 1,
      requirementCount: 4,
    }),
  });

  const options = {
    abortEarly: false,
    errors: {
      wrap: {
        label: "",
      },
    },
  };

  return schema.validate(user, options);
}

module.exports = { 
    registerSchema,
    loginSchema
 };
