'use strict';

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
        model: 'Tasks', // Use the table name string here
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users', // Use the table name string here
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
    }
  }, {
    timestamps: true, // This automatically handles createdAt
    tableName: 'Submissions'
  });

  Submission.associate = (models) => {
    // Relationships are defined here using the 'models' object
    Submission.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Submission.belongsTo(models.Task, { foreignKey: 'taskId', as: 'task' });
  };

  return Submission;
};