import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    // .default('development'),
    .required(),
  // PORT: Joi.number().default(3000),
  PORT: Joi.number(),
})