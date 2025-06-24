// models/acervo.js

const mongoose = require("mongoose");

const acervoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  tipo: { type: String, required: true }, // exemplo: "imagem", "vídeo"
  localidade: { type: String, required: true },
  data: { type: Date, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Acervo", acervoSchema);
