const express = require('express');

const PythonController = require('./controllers/PythonController');

const routes = new express.Router();

routes.get('/', (req, res) => {
    res.status(200).send('Works');
});

routes.post('/input', PythonController.inputToPythom);

module.exports = routes;