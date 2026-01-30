const analyticsService = require('../services/analytics.service');

exports.getAdminDashboard = async (req, res) => {
    const stats = await analyticsService.getAdminDashboardStats();

    return res.status(200).json({
        message: 'Dashboard analytics',
        data: stats
    });
};