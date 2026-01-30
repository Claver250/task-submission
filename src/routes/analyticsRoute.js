const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const {authenticate, authorize} = require('../middlewares/authMiddleware');
const {analyticsLimiter} = require('../middlewares/rateLimiter');

/**
 * @swagger
 * /api/analytics/dashboard:
 * get:
 * summary: Get dashboard stats
 * tags: [Analytics]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Success
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * message:
 * type: string
 * data:
 * type: object
 */

router.get('/dashboard',authenticate, authorize('admin'), analyticsLimiter, analyticsController.getAdminDashboard);

module.exports = router;