// index.js
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Form = require('./models/form');

const app = express();
app.use(bodyParser.json());

sequelize.sync();

// Create a form
app.post('/form', async (req, res) => {
    try {
        const form = await Form.create(req.body);
        res.status(201).json(form);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to fill data
app.post('/fill_data', async (req, res) => {
    try {
        // Fetch form schema from the database based on the form title
        const formSchema = await Form.findOne({ where: { title: req.query.form_title } });
        if (!formSchema) {
            return res.status(404).json({ error: 'Form schema not found' });
        }

        // Validate request body based on form schema
        const { uniqueId, name, email, phoneNumber, isGraduate } = req.body;

        // Validate uniqueId
        if (typeof uniqueId !== 'string' || !/^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(uniqueId)) {
            return res.status(400).json({ error: 'Invalid uniqueId' });
        }

        // Validate name
        if (typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Invalid name' });
        }

        // Validate email
        if (typeof email !== 'string' || !/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Validate phoneNumber
        if (typeof phoneNumber !== 'number') {
            return res.status(400).json({ error: 'Invalid phoneNumber' });
        }

        // Validate isGraduate
        if (typeof isGraduate !== 'boolean') {
            return res.status(400).json({ error: 'Invalid isGraduate' });
        }

        // Create form entry if all validations pass
        const formEntry = await Form.create(req.body);
        res.json(formEntry);
    } catch (error) {
        console.error('Error filling data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get all data for a specific form title
app.get('/fill_data', async (req, res) => {
    try {
        const formTitle = req.query.form_title;
        let forms;

        if (formTitle) {
            forms = await Form.findAll({ where: { title: formTitle } });
        } else {
            forms = await Form.findAll();
        }
        res.status(200).json(forms);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

console.log("process.env.PORT", process.env.PORT);
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
