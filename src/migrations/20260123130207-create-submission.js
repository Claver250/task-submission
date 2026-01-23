'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('Submissions', {
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
     
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('Submissions');
  }
};
