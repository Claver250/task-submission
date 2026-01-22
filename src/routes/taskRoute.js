const Task = require('../controllers/taskController');
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validateMiddleware');
const createTaskSchema = require('../validators/taskValidate');

router.post('/', authenticate, authorize('admin'), validate(createTaskSchema), taskController.createTask);
router.get('/', authenticate, taskController.getAllTasks);
router.get('/:id', authenticate, taskController.getTaskById);

module.exports = router;