const Task = require('../controllers/taskController');
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const {createTaskSchema, taskQuerySchema} = require('../validators/taskValidate');

router.post('/', authenticate, authorize('admin'), validate(createTaskSchema), taskController.createTask);
router.get('/', authenticate, validate(taskQuerySchema, 'query'), taskController.getAllTasks);
router.get('/my', authenticate, authorize('intern'), validate(taskQuerySchema), taskController.getMyTask);

module.exports = router;