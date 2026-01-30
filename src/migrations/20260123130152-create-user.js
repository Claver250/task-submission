'use strict';

const TRACKS = require('../constants/track');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      track: {
        type: Sequelize.ENUM(...TRACKS),
        allowNull: false
      },
      role: {
        type: Sequelize.ENUM('intern', 'admin'),
        allowNull: false,
        defaultValue: 'intern'
      }
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
