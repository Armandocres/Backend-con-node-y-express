const Joi = require("joi");

const id = Joi.string().uuid();
const name = Joi.string().alphanum().min(3).max(20);
const gender = Joi.string();

const createUserSchema = Joi.object({
  name: name.required(),
  gender: gender.required()
});

const updateUserSchema = Joi.object({
  name: name,
  gender: gender
});

const getUserSchema = Joi.object({
  id: id.required()
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };
