// models/form.js
require('dotenv').config();

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Form = sequelize.define('Form', {
    uniqueId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Title"
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    phoneNumber: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    isGraduate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

module.exports = Form;
