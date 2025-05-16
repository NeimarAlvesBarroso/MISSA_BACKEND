const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000" // ajuste se o frontend mudar
}));
app.use(morgan("dev")); // log das requisições para facilitar debug

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((erro) => console.error("🔴 Erro ao conectar no MongoDB:", erro));

// Rotas
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
const midiasRoutes = require("./routes/midias");

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/midias", midiasRoutes);

// Rota de verificação da API
app.get("/", (req, res) => {
  res.send("🌐 API MISSA ativa");
});

// Inicialização do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
