const express = require("express");
const router = express.Router();
const Usuario = require("../models/usuario");

// Listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao buscar usuários" });
  }
});

// Criar novo usuário
router.post("/", async (req, res) => {
  try {
    const { nome, papel, projeto } = req.body;
    const novoUsuario = new Usuario({
      nome,
      papel,
      projeto,
      criadoEm: new Date(),
    });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar usuário" });
  }
});

module.exports = router;
