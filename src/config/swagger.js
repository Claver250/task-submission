const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Internship Task Submission API',
      version: '1.0.0',
      description: 'API documentation for managing task submissions and analytics',
    },
    servers: [
      {
        url: 'http://localhost:4187',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Submission: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid', example: '51af71e8-e485-4766-992c-bdf24f193f71' },
            taskId: { type: 'string', format: 'uuid' },
            userId: { type: 'string', format: 'uuid' },
            submissionLink: { type: 'string', example: 'https://github.com/user/repo' },
            status: { 
              type: 'string', 
              enum: ['pending', 'submitted', 'approved', 'rejected'],
              example: 'approved' 
            },
            submittedAt: { type: 'string', format: 'date-time' },
            task: { $ref: '#/components/schemas/Task' }
          }
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string', example: 'Build a REST API' },
            track: { type: 'string', example: 'Backend' }
          }
        },
        DashboardStats: {
          type: 'object',
          properties: {
            totalSubmissions: { type: 'integer', example: 1 },
            totalUsers: { type: 'integer', example: 10 },
            totalTasks: { type: 'integer', example: 5 },
            completionRate: { type: 'number', format: 'float', example: 20.5 }
          }
        }
      }
    },
    // This allows the Authorize button to work globally
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;