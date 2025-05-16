const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nome: String,
  papel: String,
  projeto: String,
  criadoEm: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
