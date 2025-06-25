const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");

dotenv.config();

const app = express();

// ✅ Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // ← mais seguro para produção: especifique o domínio
  })
);
app.use(morgan("dev"));

// ✅ MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((err) => console.error("🔴 Erro ao conectar no MongoDB:", err));

// ✅ Servir uploads com caminho absoluto (Railway precisa disso)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Rotas
app.use("/api/uploads", require("./routes/uploads"));
app.use("/auth", require("./routes/auth"));
app.use("/usuarios", require("./routes/usuarios"));
app.use("/midias", require("./routes/midias"));
app.use("/acervos", require("./routes/acervos"));
app.use("/relacaovetorial", require("./routes/relacaovetorial"));
app.use("/vetor", require("./routes/vetor"));
app.use("/contribuicoes", require("./routes/contribuicoes"));
app.use("/albunsfamilia", require("./routes/albunsfamilia"));

// ✅ Verificação de status
app.get("/", (req, res) => {
  res.send("🌐 API MISSA ativa");
});

// ✅ Inicialização correta para Railway
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
