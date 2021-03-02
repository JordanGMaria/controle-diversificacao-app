const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  ativo: {
    type: Boolean,
    default: true
  },
  msg: String,
  data: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: "Usuario",
  }
});

module.exports = mongoose.model('Feedback', Schema);
