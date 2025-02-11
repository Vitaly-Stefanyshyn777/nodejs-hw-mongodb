// import Joi from "joi";

// export const createContactsSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required(),
//   phoneNumber: Joi.number().required(),
//   email: Joi.string().email().required(),
//   isFavourite: Joi.boolean(),
//   contactType: Joi.string()
//     .min(3)
//     .max(20)
//     .valid("work", "home", "personal")
//     .required(),
// });

// export const updateContactsSchema = Joi.object({
//   name: Joi.string().min(3).max(20).required(),
//   phoneNumber: Joi.number(),
//   email: Joi.string().email,
//   isFavourite: Joi.boolean(),
//   contactType: Joi.string().min(3).max(20).valid("work", "home", "personal"),
// });

import Joi from "joi";

export const createContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid("work", "home", "personal").required(),
});

export const updateContactsSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().pattern(/^[0-9]+$/),
  email: Joi.string().email(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid("work", "home", "personal"),
});
