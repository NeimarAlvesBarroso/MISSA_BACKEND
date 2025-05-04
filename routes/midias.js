const express = require("express");
const router = express.Router();
const Midia = require("../models/midia");
const autenticar = require("../middlewares/auth");

router.post("/", autenticar, async (req, res) => {
  // agora só usuários autenticados podem postar mídias
});

// Rota para listar mídias (GET)
router.get("/", async (req, res) => {
  try {
    const midias = await Midia.find();
    res.json(midias);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar mídias" });
  }
});

// Rota para cadastrar uma nova mídia (POST)
router.post("/", async (req, res) => {
  try {
    const { titulo, descricao, url, tipo } = req.body;

    const novaMidia = new Midia({ titulo, descricao, url, tipo });
    await novaMidia.save();

    res.status(201).json({ mensagem: "Mídia cadastrada com sucesso!", midia: novaMidia });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar a mídia" });
  }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const Midia = require("../models/midia");
const verifyToken = require("../middleware/verifyToken");

// Rota protegida (exige token)
router.post("/", verifyToken, async (req, res) => {
  const { titulo, descricao, url } = req.body;

  try {
    const novaMidia = new Midia({ titulo, descricao, url });
    await novaMidia.save();
    res.status(201).json(novaMidia);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao salvar a mídia" });
  }
});



