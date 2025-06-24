const express = require("express");
const router = express.Router();
const Album = require("../models/AlbumFamilia");
const Contribuicao = require("../models/Contribuicao");

// GET /albunsfamilia — listar todos os álbuns
router.get("/", async (req, res) => {
  try {
    const albuns = await Album.find().sort({ criadoEm: -1 });
    res.json(albuns);
  } catch (err) {
    console.error("Erro ao buscar álbuns:", err);
    res.status(500).json({ erro: "Erro ao buscar álbuns" });
  }
});

// POST /albunsfamilia — criar novo álbum
router.post("/", async (req, res) => {
  try {
    const novo = await Album.create({ ...req.body, criadoEm: new Date() });
    res.json(novo);
  } catch (err) {
    console.error("Erro ao criar álbum:", err);
    res.status(500).json({ erro: "Erro ao criar álbum" });
  }
});

// GET /albunsfamilia/:id — buscar álbum por ID
router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ erro: "Álbum não encontrado" });
    res.json(album);
  } catch (err) {
    console.error("Erro ao buscar álbum por ID:", err);
    res.status(500).json({ erro: "Erro ao buscar álbum" });
  }
});

// POST /albunsfamilia/:id/midia — adiciona mídia ao álbum e salva na timeline
router.post("/:id/midia", async (req, res) => {
  try {
    const { url, tipo, legenda } = req.body;

    const album = await Album.findById(req.params.id);
    if (!album) return res.status(404).json({ erro: "Álbum não encontrado" });

    const novaMidia = {
      url,
      tipo,
      legenda,
      data: new Date(),
    };

    album.midias.push(novaMidia);
    await album.save();

    // Cria contribuição na timeline
    await Contribuicao.create({
      titulo: legenda,
      descricao: `Mídia adicionada ao álbum ${album.titulo}`,
      url,
      tipo,
      sessao: "timeline",
      autor: { nome: album.autor?.nome || "Anônimo" },
      vetor: {
        camada: "memória-familiar",
        intencao: "registro simbólico",
        reverberacao: "acervo colaborativo",
      },
      local: "Sabinópolis",
      ano: new Date().getFullYear(),
      tags: ["álbum", "família", "timeline"]
    });

    res.json({ mensagem: "Mídia adicionada com sucesso!", album });
  } catch (err) {
    console.error("Erro ao adicionar mídia:", err);
    res.status(500).json({ erro: "Erro ao adicionar mídia" });
  }
});

// DELETE /albunsfamilia/:id — excluir álbum
router.delete("/:id", async (req, res) => {
  try {
    const deletado = await Album.findByIdAndDelete(req.params.id);
    if (!deletado) return res.status(404).json({ erro: "Álbum não encontrado para exclusão" });
    res.json({ mensagem: "Álbum removido com sucesso" });
  } catch (err) {
    console.error("Erro ao excluir álbum:", err);
    res.status(500).json({ erro: "Erro ao excluir álbum" });
  }
});

module.exports = router;
