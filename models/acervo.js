// models/acervo.js

const mongoose = require("mongoose");

// ✅ Schema para Acervos Gerais (não familiares ou institucionais)
const acervoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    tipo: {
      type: String,
      required: true,
      enum: ["imagem", "vídeo", "áudio", "documento", "outro"],
      lowercase: true,
    },
    localidade: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // cria automaticamente createdAt e updatedAt
  }
);

module.exports = mongoose.model("Acervo", acervoSchema);
