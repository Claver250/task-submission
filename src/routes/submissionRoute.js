const Submission = require('../models/submission');
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, submissionController.createSubmission);
router.get('/:id', authenticate, submissionController.getSubmissionById);
router.put('/:id/status', authenticate, submissionController.updateSubmissionStatus);
router.delete('/:id', authenticate, submissionController.deleteSubmission);

module.exports = router;