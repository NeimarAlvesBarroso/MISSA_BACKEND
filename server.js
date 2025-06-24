const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path"); // ✅ Necessário para caminhos absolutos
const uploadsRoutes = require("./routes/uploads"); // ✅ Apenas uma vez

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);
app.use(morgan("dev"));

// ✅ Conexão com MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((erro) => console.error("🔴 Erro ao conectar no MongoDB:", erro));

// ✅ Servir arquivos da pasta "uploads"
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Caminho absoluto garantido
app.use("/api/uploads", uploadsRoutes); // API de upload + timeline

// ✅ Rotas principais da API
app.use("/auth", require("./routes/auth"));
app.use("/usuarios", require("./routes/usuarios"));
app.use("/midias", require("./routes/midias"));
app.use("/acervos", require("./routes/acervos"));
app.use("/relacaovetorial", require("./routes/relacaovetorial"));
app.use("/vetor", require("./routes/vetor"));
app.use("/contribuicoes", require("./routes/contribuicoes"));
app.use("/albunsfamilia", require("./routes/albunsfamilia"));

// ✅ Rota de verificação
app.get("/", (req, res) => {
  res.send("🌐 API MISSA ativa");
});

// ✅ Início do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
