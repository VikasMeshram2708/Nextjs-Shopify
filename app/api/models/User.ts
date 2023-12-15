import Joi from "joi";

export const UserSchema = Joi?.object({
  name: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(100).required(),
});


