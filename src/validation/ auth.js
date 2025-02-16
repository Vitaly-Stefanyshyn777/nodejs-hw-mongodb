import Joi from "joi";

const stringRequired = Joi.string().required();
const email = Joi.string().email().required();

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email,
  password: stringRequired,
});

export const loginUserSchema = Joi.object({
  email,
  password: stringRequired,
});
