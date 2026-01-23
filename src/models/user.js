'use strict';

const TRACKS = require('../constants/track');

module.exports = (sequelize, DataTypes) => {
    // We use 'sequelize' (passed in as an argument) instead of 'db'
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4 // Use DataTypes.UUIDV4 here
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
    }, {
        timestamps: true,
        tableName: 'Users'
    });

    return User;
};