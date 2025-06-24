// models/AlbumFamilia.js
const mongoose = require("mongoose");

// Esquema da Mídia
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
  legenda: String,
  data: {
    type: Date,
    default: Date.now,
  },
});

// Esquema do Álbum de Família
const albumSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: String,
  criadoEm: {
    type: Date,
    default: Date.now,
  },
  autor: {
    nome: {
      type: String,
      required: true,
    },
  },
  sessao: {
    type: String,
    default: "familia",
  },
  midias: [midiaSchema],
});

module.exports = mongoose.model("AlbumFamilia", albumSchema);
