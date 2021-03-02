const express = require('express');
const rotas = express.Router();

const controller = require('./controller');
const jwt = require('../../core/utils');

rotas.post('/list', controller.index);
rotas.get('/:id', controller.get);
rotas.post('/', controller.new);
rotas.post('/aporte', controller.aporte);
rotas.put('/', controller.edit);
rotas.delete('/:id', controller.delete);

module.exports = rotas;
