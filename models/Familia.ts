import mongoose, { Schema, models, model } from "mongoose";

/* -------------------------
RELACAO VETORIAL
usuario → papel
--------------------------*/

const RelacaoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },

    papel: {
      type: String,
      enum: [
        "autor",
        "curador",
        "colaborador",
        "comunidade",
      ],
      default: "comunidade",
    },
  },
  { _id: false }
);

/* -------------------------
SCHEMA FAMÍLIA
--------------------------*/

const FamiliaSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
      index: true,
    },

    descricao: {
      type: String,
      default: "",
    },

    local: {
      type: String,
      default: "Sabinópolis",
    },

    dataInicio: Date,

    dataFim: Date,

    /* -------------------------
    MÍDIAS DO ACERVO
    --------------------------*/

    midias: [
      {
        type: Schema.Types.ObjectId,
        ref: "Acervo",
      },
    ],

    /* -------------------------
    RELAÇÕES VETORIAIS
    --------------------------*/

    relacoes: [RelacaoSchema],

    /* -------------------------
    TAGS
    --------------------------*/

    tags: [String],

    /* -------------------------
    AUTOR DO REGISTRO
    --------------------------*/

    criadoPor: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

/* -------------------------
EVITA DUPLICAÇÃO DO MODEL
(HOT RELOAD NEXTJS)
--------------------------*/

const Familia =
  models.Familia || model("Familia", FamiliaSchema);

export default Familia;