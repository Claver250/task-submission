'use strict';

const TRACKS = require('../constants/track');

module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        deadline: {
            type: DataTypes.DATE,
            allowNull: false
        },
        track: {
            type: DataTypes.ENUM(...TRACKS),
            allowNull: false
        },
        requirements: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true,
        tableName: 'Tasks'
    });

    // Setting up the relationship
    Task.associate = (models) => {
        // This links the Task to the User model
        Task.hasMany(models.Submission, { foreignKey: 'taskId', as: 'submissions' });
    };

    return Task;
};