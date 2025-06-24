const express = require("express");
const router = express.Router();
const Relacao = require("../models/relacaovetorial");

// GET /relacaovetorial - Listar relações vetoriais
router.get("/", async (req, res) => {
  try {
    const relacoes = await Relacao.find();
    res.json(relacoes);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar relações vetoriais" });
  }
});

module.exports = router;
