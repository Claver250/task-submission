'use strict';

const Task = require('../models/task');
const User = require('../models/user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Submissions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      taskId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'Task',
            key: 'id'
        }
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
      },
      status: {
        type: Sequelize.ENUM('pending','submitted', 'under review', 'approved', 'changes requested', 'rejected'),
        allowNull: false,
        defaultValue: 'submitted'
      },
      submissionLink: {
            type: Sequelize.STRING,
            allowNull: true
      },
      submittedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    },{
      timestamps: true, 
      tableName: 'Submissions'
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Submissions');
  }
};
