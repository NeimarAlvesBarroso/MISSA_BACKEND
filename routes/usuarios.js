const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario");

router.post("/cadastro", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = new Usuario({ nome, email, senha: senhaHash });
    await novoUsuario.save();

    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao cadastrar usuário" });
  }
});

module.exports = router;

