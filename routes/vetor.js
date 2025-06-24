const express = require("express");
const router = express.Router();
const Vetor = require("../models/vetor");

// GET /vetor - listar vetores
router.get("/", async (req, res) => {
  try {
    const vetores = await Vetor.find();
    res.json(vetores);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar vetores" });
  }
});

// POST /vetor - adicionar vetor
router.post("/", async (req, res) => {
  try {
    const novoVetor = new Vetor(req.body);
    await novoVetor.save();
    res.status(201).json(novoVetor);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar vetor" });
  }
});

module.exports = router;
