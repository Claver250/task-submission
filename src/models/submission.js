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
    task_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Task,
            key: 'id'
        }
    },
    user_id: {
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

User.hasMany(Submission, { foreignKey: 'user_id' });
Submission.belongsTo(User, { foreignKey: 'user_id' });

Task.hasMany(Submission, { foreignKey: 'task_id' });
Submission.belongsTo(Task, { foreignKey: 'task_id' });

module.exports = Submission;