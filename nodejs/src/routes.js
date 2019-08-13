const express = require('express');

const PythonController = require('./controllers/PythonController');

const routes = new express.Router();

routes.get('/', (req, res) => {
    res.send('Works');
});

routes.get('/input/:id', PythonController.inputToPythom);
//mudar para post

module.exports = routes;