// models/Contribuicao.js
const mongoose = require("mongoose");

const ContribuicaoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ["foto", "vídeo", "áudio"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  origem: {
    type: String,
    default: "upload-comunitario", // outras opções: "facebook", "youtube", "upload-album"
  },
  sessao: {
    type: String,
    enum: ["timeline", "fotos-antigas", "institucional", "familia"],
    default: "timeline",
  },
  tags: [String],
  ano: Number,
  local: String,

  vetor: {
    camada: String,         // Ex: "acervo-imaterial"
    intencao: String,       // Ex: "homenagem", "registro simbólico"
    reverberacao: String,   // Ex: "identidade local"
  },

  estado: {
    type: String,
    enum: ["pendente", "aprovada", "rejeitada"],
    default: "pendente",
  },

  criadoEm: {
    type: Date,
    default: Date.now,
  },

  autor: {
    nome: String,
    email: String,
    papel: String, // Ex: "morador", "pesquisador", "professor"
  }
});

module.exports = mongoose.model("Contribuicao", ContribuicaoSchema);
