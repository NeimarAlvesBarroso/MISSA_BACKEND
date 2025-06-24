// gerarToken.js
const jwt = require("jsonwebtoken");

// 🔐 A mesma chave que você usa no backend para verificar tokens
const chaveSecreta = "chave-secreta-missa"; // ou pegue do .env

// 🧬 Conteúdo simbólico vetorial do token
const payload = {
  papel: "guardiao-do-acervo",
  usuario: "demo"
};

// 🕓 Tempo de validade (pode ser longo para testes)
const token = jwt.sign(payload, chaveSecreta, { expiresIn: "365d" });

console.log("TOKEN JWT SIMBÓLICO:");
console.log(token);
