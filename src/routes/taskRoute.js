const Task = require('../controllers/taskController');
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authenticate = require('../middlewares/authMiddleware');

router.post('/', authenticate, taskController.createTask);
router.get('/', authenticate, taskController.getAllTasks);
router.get('/:id', authenticate, taskController.getTaskById);

module.exports = router;