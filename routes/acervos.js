const express = require("express");
const router = express.Router();
const Acervo = require("../models/acervo"); // ✅ Modelo do acervo

// GET /acervos
router.get("/", async (req, res) => {
  try {
    const acervos = await Acervo.find();
    res.json(acervos);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar acervos" });
  }
});

module.exports = router;
