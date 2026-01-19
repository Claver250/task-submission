const Joi = require('joi');
const TRACKS = require('../constants/track');

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    track: Joi.string().valid(...TRACKS).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {registerSchema, loginSchema};