const Joi = require('joi');
const TRACKS = require('../constants/track')

const createTaskSchema = Joi.object({
    title: Joi.string().min(6).required(),
    description: Joi.string().required(),
    deadline: Joi.date().required(),
    track: Joi.string().valid(...TRACKS).required(),
    requirements: Joi.string().min(10).required()
});

const taskQuerySchema = Joi.object({
    limit: Joi.number().integer().min(0).max(100).default(10),
    offset: Joi.number().integer().min(0).max(0).default(0),
    sortBy: Joi.string().valid('createdAt').default('cretedAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
})

module.exports = {createTaskSchema, taskQuerySchema};