const Joi = require('joi');

const createSubmissionSchema = Joi.object({
    taskId: Joi.string().guid({ version: 'uuidv4'}).required(),
    userId: Joi.string().guid({ version: 'uuidv4'}).required(),
    submissionLink: Joi.string().uri({ scheme: ['http', 'https']}).required()
});

const updateSubmissionSchema = Joi.object({
    status: Joi.string().valid('submitted', 'under review', 'approved', 'changes requested', 'rejected').required()
});

const submissionQuerySchema = Joi.object({
    limit: Joi.number().integer().min(0).max(100).default(10),
    offset: Joi.number().integer().min(0).max(0).default(0),
    sortBy: Joi.string().valid('createdAt').default('createdAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
});

const mySubmissionQuerySchema = Joi.object({
    limit: Joi.number().integer().min(0).max(100).default(10),
    offset: Joi.number().integer().min(0).max(0).default(0),
    sortBy: Joi.string().valid('createdAt', 'submittedAt', 'status').default('submittedAt'),
    order: Joi.string().valid('asc', 'desc').default('desc')
});

module.exports = {createSubmissionSchema, updateSubmissionSchema, submissionQuerySchema};