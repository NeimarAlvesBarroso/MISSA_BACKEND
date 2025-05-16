const express = require("express");
const router = express.Router();
const Midia = require("../models/midia");
const autenticar = require("../middlewares/auth"); // ou use verifyToken, se preferir esse nome

// Rota para cadastrar uma nova mídia (POST) – protegida
router.post("/", autenticar, async (req, res) => {
  try {
    const { titulo, descricao, url, tipo } = req.body;

    const novaMidia = new Midia({ titulo, descricao, url, tipo });
    await novaMidia.save();

    res.status(201).json({ mensagem: "Mídia cadastrada com sucesso!", midia: novaMidia });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar a mídia" });
  }
});

// Rota para listar todas as mídias (GET)
router.get("/", async (req, res) => {
  try {
    const midias = await Midia.find();
    res.json(midias);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar mídias" });
  }
});

module.exports = router;
