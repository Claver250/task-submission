'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      track: {
        type: DataTypes.ENUM(...TRACKS),
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('intern', 'admin'),
        allowNull: false,
        defaultValue: 'intern'
      }
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
