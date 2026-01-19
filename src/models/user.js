const {sequelize, DataTypes, UUIDV4} = require('sequelize');
const db = require('../config/database');
const TRACKS = require('../constants/track');

const User = db.define('User', {
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
    }
}, {
    timestamps: true
});

module.exports = User;