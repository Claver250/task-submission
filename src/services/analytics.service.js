const {Submission, Task, User} = require('../models');
const {Op} = require('sequelize');

exports.getAdminDashboardStats = async() => {
    const totalSubmissons = await Submission.count({
        where: {
            status : {
                [Op.in]: ['submitted', 'approved']
            }}
    });

    const totalUsers = await User.count({
        where: {role: 'intern'}
    });

    const totalTasks = await Task.count();

    const expectedSubmissions = totalUsers * totalTasks;

    const completionRate = expectedSubmissions === 0 ? 0 : Math.round((totalSubmissons / expectedSubmissions) * 100);

    return {
        totalSubmissons,
        totalUsers,
        totalTasks,
        completionRate
    };
};