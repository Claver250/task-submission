const Joi = require('joi');

const createSubmissionSchema = Joi.object({
    taskId: Joi.string().guid({ version: 'uuidv4'}).required(),
    userId: Joi.string().guid({ version: 'uuidv4'}).required(),
    submissionLink: Joi.string().uri({ scheme: ['http', 'https']}).required()
});

const updateSubmissionSchema = Joi.object({
    status: Joi.string().valid('submitted', 'under review', 'approved', 'changes requested', 'rejected').required()
});

module.exports = {createSubmissionSchema, updateSubmissionSchema};