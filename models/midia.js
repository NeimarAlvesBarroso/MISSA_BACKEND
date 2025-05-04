const mongoose = require("mongoose");

const midiaSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  url: String,
  tipo: String, // Ex: "YouTube", "Facebook", "Instagram"
  dataEnvio: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Midia", midiaSchema);
