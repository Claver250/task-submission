const Joi = require('joi');
const TRACKS = require('../constants/track')

const createTaskSchema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().required(),
    deadline: Joi.date().required(),
    track: Joi.string().valid(...TRACKS).required(),
    requirements: Joi.string().min(10).required()
});

module.exports = createTaskSchema;