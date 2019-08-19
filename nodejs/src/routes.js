const express = require('express');

const PythonController = require('./app/controllers/PythonController');

const routes = new express.Router();

routes.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

routes.post('/input', PythonController.inputToPythom);

module.exports = routes;