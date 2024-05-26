// index.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Form = require('./models/form');
const validateFormData = require('../utils/validateFormData');

const app = express();
app.use(bodyParser.json());

sequelize.sync();

// Create a form

router.post('/form', async (req, res) => {
    let dynamicFormStructure = null;
    const { structure } = req.body;
    if (!structure || typeof structure !== 'object') {
        return res.status(400).json({ error: 'Invalid form structure' });
    }
    try {
        // Update the dynamic form structure
        dynamicFormStructure = structure;
        sequelize.models.DynamicForm = createDynamicFormModel(dynamicFormStructure);

        if (!sequelize.models.DynamicForm) {
            return res.status(400).json({ error: 'Form structure is not defined' });
        } else {
            res.json({ message: 'Form structure updated successfully' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Route to fill data
router.post('/fill_data', async (req, res) => {
    try {
        const formTitle = req.query.form_title;

        if (!sequelize.models.DynamicForm) {
            return res.status(400).json({ error: 'Form structure is not defined' });
        }

        const validationError = validateFormData(req.body, dynamicFormStructure);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const formInstance = await sequelize.models.DynamicForm.create(req.body);
        res.status(201).json(formInstance);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


// Get all data for a specific form title
router.get('/fill_data', async (req, res) => {
    try {
        if (!sequelize.models.DynamicForm) {
            return res.status(400).json({ error: 'Form structure is not defined' });
        }

        const forms = await sequelize.models.DynamicForm.findAll();
        res.status(200).json(forms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
