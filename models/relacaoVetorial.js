const mongoose = require("mongoose");

const RelacaoVetorialSchema = new mongoose.Schema({
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  tipo: { type: String, required: true },
  intensidade: { type: Number, default: 1 },
  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model("RelacaoVetorial", RelacaoVetorialSchema);
