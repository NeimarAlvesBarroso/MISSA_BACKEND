const express = require("express");
const router = express.Router();
const Contribuicao = require("../models/Contribuicao");

// POST - Nova contribuição
router.post("/", async (req, res) => {
  try {
    const nova = await Contribuicao.create(req.body);
    res.json({ mensagem: "Contribuição recebida!", contribuicao: nova });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao salvar contribuição" });
  }
});

// GET - Listar todas ou filtrar por sessão
router.get("/", async (req, res) => {
  try {
    const { sessao } = req.query;

    const filtro = sessao ? { sessao } : {};
    const todas = await Contribuicao.find(filtro).sort({ criadoEm: -1 });

    res.json(todas);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar contribuições" });
  }
});

module.exports = router;
