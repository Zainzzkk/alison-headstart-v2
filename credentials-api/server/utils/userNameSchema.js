const Joi = require('joi');

// validates username to have only letters and numbers and be between 3 and 30 characters
const usernameSchema = Joi.string()
  .alphanum()
  .min(3)
  .max(20)
  .required()
  .messages({
    "string.pattern.base": `Username should be between 3 to 30 characters and contain letters or numbers only`,
    "string.empty": `Username cannot be empty`,
    "any.required": `Username is required`,
  });

module.exports = usernameSchema;