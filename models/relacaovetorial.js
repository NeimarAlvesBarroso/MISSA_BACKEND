// models/relacaovetorial.js
const mongoose = require("mongoose");

const relacaoVetorialSchema = new mongoose.Schema({
  origem: String,
  destino: String,
  tipo: String,
  intensidade: Number,
  tags: [String],
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RelacaoVetorial", relacaoVetorialSchema);
