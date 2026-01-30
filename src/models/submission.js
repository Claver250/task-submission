'use strict';

const Task = require('./task');
const User = require('./user');

module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    taskId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tasks', 
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', 
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending','submitted', 'under review', 'approved', 'changes requested', 'rejected'),
      allowNull: false,
      defaultValue: 'pending'
    },
    submissionLink: {
      type: DataTypes.STRING,
      allowNull: true
    },
    submittedAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
  }, {
    timestamps: true, 
    tableName: 'Submissions'
  });

  Submission.associate = (models) => {
    Submission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Submission.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' });
  };

  return Submission;
};