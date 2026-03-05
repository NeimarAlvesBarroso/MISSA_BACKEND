const express = require("express");
const router = express.Router();
const Acervo = require("../models/AcervoInstitucional");
const Contribuicao = require("../models/Contribuicao");

// 🔹 GET /acervosinstitucional — Listar todos os acervos institucionais
router.get("/", async (req, res) => {
  try {
    const acervos = await Acervo.find().sort({ criadoEm: -1 });
    res.json(acervos);
  } catch (err) {
    console.error("🔴 Erro ao buscar acervos:", err);
    res.status(500).json({ erro: "Erro ao buscar acervos institucionais" });
  }
});

// 🔹 POST /acervosinstitucional — Criar um novo acervo institucional
router.post("/", async (req, res) => {
  try {
    const novoAcervo = await Acervo.create({
      ...req.body,
      criadoEm: new Date(),
    });
    res.status(201).json(novoAcervo);
  } catch (err) {
    console.error("🔴 Erro ao criar acervo:", err);
    res.status(500).json({ erro: "Erro ao criar acervo institucional" });
  }
});

// 🔹 GET /acervosinstitucional/:id — Buscar acervo por ID
router.get("/:id", async (req, res) => {
  try {
    const acervo = await Acervo.findById(req.params.id);
    if (!acervo) {
      return res.status(404).json({ erro: "Acervo não encontrado" });
    }
    res.json(acervo);
  } catch (err) {
    console.error("🔴 Erro ao buscar acervo:", err);
    res.status(500).json({ erro: "Erro ao buscar acervo institucional" });
  }
});

// 🔹 POST /acervosinstitucional/:id/midia — Adicionar mídia ao acervo institucional
router.post("/:id/midia", async (req, res) => {
  try {
    const { url, tipo, legenda } = req.body;

    if (!url || !tipo || !legenda) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando (url, tipo ou legenda)" });
    }

    const acervo = await Acervo.findById(req.params.id);
    if (!acervo) {
      return res.status(404).json({ erro: "Acervo não encontrado" });
    }

    const novaMidia = {
      url,
      tipo,
      legenda,
      data: new Date(),
    };

    acervo.midias.push(novaMidia);
    await acervo.save();

    await Contribuicao.create({
      titulo: legenda,
      descricao: `Mídia adicionada ao acervo institucional: ${acervo.instituicao}`,
      url,
      tipo,
      sessao: "timeline",
      autor: { nome: acervo.instituicao || "Instituição Desconhecida" },
      vetor: {
        camada: "memória-institucional",
        intencao: "registro simbólico",
        reverberacao: "acervo coletivo",
      },
      local: "Sabinópolis",
      ano: new Date().getFullYear(),
      tags: ["institucional", "acervo", "timeline"],
    });

    res.json({ mensagem: "✅ Mídia adicionada com sucesso!", acervo });
  } catch (err) {
    console.error("🔴 Erro ao adicionar mídia:", err);
    res.status(500).json({ erro: "Erro ao adicionar mídia ao acervo" });
  }
});

module.exports = router;
