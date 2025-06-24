const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Album = require("../models/AlbumFamilia");
const Contribuicao = require("../models/Contribuicao");

const router = express.Router();

// Cria a pasta uploads se não existir
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Configuração do destino
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// POST /api/uploads/:albumId
router.post("/:albumId", upload.single("midia"), async (req, res) => {
  try {
    const { albumId } = req.params;
    const { legenda, tipo, autor } = req.body;
    const url = `/uploads/${req.file.filename}`;

    const album = await Album.findById(albumId);
    if (!album) return res.status(404).json({ erro: "Álbum não encontrado" });

    const novaMidia = { url, tipo, legenda, data: new Date() };
    album.midias.push(novaMidia);
    await album.save();

    await Contribuicao.create({
      titulo: legenda,
      descricao: `Mídia do álbum: ${album.titulo}`,
      tipo,
      url,
      origem: "upload-album",
      sessao: "timeline",
      autor: { nome: autor || "anônimo" },
      vetor: {
        camada: "memória-familiar",
        intencao: "registro simbólico",
        reverberacao: "acervo colaborativo",
      },
      ano: new Date().getFullYear(),
      local: "Sabinópolis",
      tags: ["álbum", "família", "timeline"],
    });

    res.json({ mensagem: "✅ Mídia enviada com sucesso!", url });
  } catch (err) {
    console.error("Erro no upload:", err);
    res.status(500).json({ erro: "Erro ao salvar mídia" });
  }
});

module.exports = router;
