const express = require('express');
const rotas = express.Router();
const controller = require('./controller');

rotas.post('/login', controller.login);
rotas.post('/registrar', controller.new);

module.exports = rotas;
