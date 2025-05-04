const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("🟢 MongoDB conectado"))
  .catch((erro) => console.error("Erro ao conectar no MongoDB:", erro));

// Rotas
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
const midiasRoutes = require("./routes/midias");

app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/midias", midiasRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
