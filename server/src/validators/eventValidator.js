const Joi = require("joi");

const createEventSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Event title is required",
      "string.min": "Event title must be at least 3 characters",
      "string.max": "Event title cannot exceed 100 characters",
    }),

  description: Joi.string()
    .trim()
    .min(10)
    .required()
    .messages({
      "string.empty": "Event description is required",
      "string.min": "Description must be at least 10 characters",
    }),

  category: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Event category is required",
    }),

  venue: Joi.string()
    .trim()
    .required()
    .messages({
      "string.empty": "Event venue is required",
    }),

  eventDate: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Please provide a valid event date",
      "any.required": "Event date is required",
    }),

  registrationDeadline: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "Please provide a valid registration deadline",
      "any.required": "Registration deadline is required",
    }),

  maxParticipants: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      "number.base": "Maximum participants must be a number",
      "number.integer": "Maximum participants must be a whole number",
      "number.min": "Maximum participants must be at least 1",
      "any.required": "Maximum participants is required",
    }),

  banner: Joi.string()
    .allow("")
    .default(""),
});

module.exports = {
  createEventSchema,
};