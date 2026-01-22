const {sequelize, DataTypes, UUIDV4} = require('sequelize');
const db = require('../config/database');
const User = require('./user');
const Task = require('./task');

const Submission = db.define('Submission', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
    },
    taskId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Task,
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    status: {
        type: DataTypes.ENUM('submitted', 'under review', 'approved', 'changes requested', 'rejected'),
        allowNull: false,
        defaultValue: 'submitted'
    },
    submissionLink: {
            type: DataTypes.STRING,
            allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

User.hasMany(Submission, { foreignKey: 'userId' });
Submission.belongsTo(User, { foreignKey: 'userId' });

Task.hasMany(Submission, { foreignKey: 'taskId' });
Submission.belongsTo(Task, { foreignKey: 'taskId' });

module.exports = Submission;