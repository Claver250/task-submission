const {sequelize, DataTypes, UUIDV4} = require('sequelize');
const db = require('../config/database');
const TRACKS = require('../constants/track');

const Task = db.define('Task', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
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
});

module.exports = Task;