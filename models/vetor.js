const mongoose = require("mongoose");

const VetorSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  tipo: { type: String, required: true },
  origem: String,
  destino: String,
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Vetor", VetorSchema);
