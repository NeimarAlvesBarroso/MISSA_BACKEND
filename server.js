const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const app = express();

// ✅ Middleware: JSON e logger
app.use(express.json());
app.use(morgan("dev"));

// ✅ CORS — produção recomenda domínio fixo
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
  })
);

// ✅ Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((err) => console.error("🔴 Erro ao conectar no MongoDB:", err));

// ✅ Servir arquivos estáticos (imagens/vídeos)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Rotas principais da API
app.use("/api/uploads", require("./routes/uploads"));                  // Upload de arquivos
app.use("/auth", require("./routes/auth"));                           // Autenticação
app.use("/usuarios", require("./routes/usuarios"));                   // Usuários
app.use("/midias", require("./routes/midias"));                       // Mídias
app.use("/acervos", require("./routes/acervos"));                     // Acervos gerais
app.use("/relacaovetorial", require("./routes/relacaovetorial"));     // Relações vetoriais
app.use("/vetor", require("./routes/vetor"));                         // Vetor
app.use("/contribuicoes", require("./routes/contribuicoes"));         // Timeline
app.use("/albunsfamilia", require("./routes/albunsfamilia"));         // Álbum de família
app.use("/acervosinstitucional", require("./routes/acervosinstitucional")); // ✅ Acervo institucional

// ✅ Verificação da API
app.get("/", (req, res) => {
  res.send("🌐 API MISSA ativa");
});

// ✅ Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
