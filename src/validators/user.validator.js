const Joi = require("@hapi/joi");

const userValidator = {
    create: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }),

    update: Joi.object({
        name: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string().min(6),
    }).min(1),  // at least one field should be updated
};

module.exports = userValidator;