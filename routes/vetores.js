const express = require("express");
const router = express.Router();
const Vetor = require("../models/vetor");

router.post("/", async (req, res) => {
  try {
    const novoVetor = new Vetor(req.body);
    await novoVetor.save();
    res.status(201).json(novoVetor);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar vetor", detalhes: err });
  }
});

router.get("/", async (req, res) => {
  const vetores = await Vetor.find();
  res.json(vetores);
});

module.exports = router;
