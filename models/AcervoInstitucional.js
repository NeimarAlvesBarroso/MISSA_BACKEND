// models/AcervoInstitucional.js
const mongoose = require("mongoose");

// ✅ Schema de mídias associadas
const midiaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["foto", "vídeo"],
    required: true,
  },
  legenda: {
    type: String,
  },
  data: {
    type: Date,
    default: Date.now,
  },
});

// ✅ Schema do acervo institucional
const acervoInstitucionalSchema = new mongoose.Schema({
  instituicao: {
    type: String,
    required: true, // Ex: Prefeitura, APAE, Escolas, etc.
  },
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
  },
  criadoEm: {
    type: Date,
    default: Date.now,
  },
  autor: {
    nome: {
      type: String,
      required: false,
      default: "Anônimo", // ✅ Torna o campo opcional, com fallback
    },
  },
  midias: [midiaSchema],
});

module.exports = mongoose.model("AcervoInstitucional", acervoInstitucionalSchema);
