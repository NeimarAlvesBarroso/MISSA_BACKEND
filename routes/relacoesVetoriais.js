const express = require("express");
const router = express.Router();
const RelacaoVetorial = require("../models/relacaovetorial");

// GET todas as relações
router.get("/", async (req, res) => {
  try {
    const relacoes = await RelacaoVetorial.find().populate("origem destino");
    res.json(relacoes);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar relações vetoriais" });
  }
});

// POST nova relação vetorial
router.post("/", async (req, res) => {
  try {
    const { origem, destino, tipo, intensidade } = req.body;
    const relacao = new RelacaoVetorial({ origem, destino, tipo, intensidade });
    await relacao.save();
    res.status(201).json(relacao);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar relação vetorial" });
  }
});

module.exports = router;
