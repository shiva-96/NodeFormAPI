// utils/createDynamicFormModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

function createDynamicFormModel(structure) {
    const attributes = {};
    for (const [field, type] of Object.entries(structure)) {
        switch (type.toUpperCase()) {
            case 'UUID':
                attributes[field] = {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true
                };
                break;
            case 'STRING':
                attributes[field] = { type: DataTypes.STRING };
                break;
            case 'STRING (email format)':
                attributes[field] = { 
                    type: DataTypes.STRING,
                    validate: { isEmail: true }
                };
                break;
            case 'BIGINT':
                attributes[field] = { type: DataTypes.BIGINT };
                break;
            case 'BOOLEAN':
                attributes[field] = { type: DataTypes.BOOLEAN };
                break;
            default:
                throw new Error(`Unsupported data type: ${type}`);
        }
    }

    return sequelize.define('DynamicForm', attributes);
}


// utils/validateFormData.js
function validateFormData(data, structure) {
    for (const [field, type] of Object.entries(structure)) {
        if (data[field] === undefined) {
            return `Field "${field}" is missing`;
        }
        switch (type.toUpperCase()) {
            case 'UUID':
                // UUID validation can be complex, assuming simple length check here
                if (typeof data[field] !== 'string' || data[field].length !== 36) {
                    return `Field "${field}" must be a valid UUID`;
                }
                break;
            case 'STRING':
                if (typeof data[field] !== 'string') {
                    return `Field "${field}" must be a string`;
                }
                break;
            case 'STRING (email format)':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (typeof data[field] !== 'string' || !emailRegex.test(data[field])) {
                    return `Field "${field}" must be a valid email address`;
                }
                break;
            case 'BIGINT':
                if (typeof data[field] !== 'number' || !Number.isInteger(data[field])) {
                    return `Field "${field}" must be an integer`;
                }
                break;
            case 'BOOLEAN':
                if (typeof data[field] !== 'boolean') {
                    return `Field "${field}" must be a boolean`;
                }
                break;
            default:
                return `Unsupported data type: ${type}`;
        }
    }
    return null;
}

module.exports = {
    validateFormData,
    createDynamicFormModel
};
