const Submission = require('../models/submission');
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const { createSubmissionSchema, updateSubmissionSchema} = require('../validators/submissionValidate');

router.post('/', authenticate, authorize('admin'), validate(createSubmissionSchema), submissionController.createSubmission);
router.get('/', authenticate, submissionController.getAllSubmissions);
router.get('/:id', authenticate, submissionController.getSubmissionById);
router.patch('/:id/', authenticate, authorize('admin'), validate(updateSubmissionSchema), submissionController.updateSubmissionStatus);
router.delete('/:id', authenticate, submissionController.deleteSubmission);

module.exports = router;