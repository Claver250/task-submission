const Submission = require('../models/submission');
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createSubmissionSchema, updateSubmissionSchema, submissionQuerySchema, } = require('../validators/submissionValidate');
const {submissionLimiter}  =  require('../middlewares/rateLimiter');

router.post('/', authenticate, authorize('admin'), submissionLimiter, validate(createSubmissionSchema), submissionController.createSubmission);
router.post('/submit', authenticate, authorize('intern'), submissionController.submitTask);
router.get('/', authenticate, authorize('admin'), validate(submissionQuerySchema), submissionController.getAllSubmissions);
router.get('/my', authenticate, authorize('intern'), validate(submissionQuerySchema), submissionController.getMySubmission);
router.patch('/:id/update', authenticate, authorize('admin'), validate(updateSubmissionSchema), submissionController.updateSubmissionStatus);
router.delete('/:id', authenticate, submissionController.deleteSubmission);

module.exports = router;