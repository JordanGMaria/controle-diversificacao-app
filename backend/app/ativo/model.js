const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  ativo: {
    type: Boolean,
    default: true
  },
  nome: String,
  corretora: String,
  quantidade: Number,
  preco_medio: Number,
  preco: Number,
  nota: Number,
  tipo: String,
  setor: String,
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
  }
});

module.exports = mongoose.model('Ativo', Schema);
