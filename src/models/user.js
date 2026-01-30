'use strict';

const TRACKS = require('../constants/track');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
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
            allowNull: true
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