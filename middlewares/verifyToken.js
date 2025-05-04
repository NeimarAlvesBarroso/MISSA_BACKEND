const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ erro: "Token não fornecido" });
  }

  try {
    const tokenFormatado = token.replace("Bearer ", "");
    const decoded = jwt.verify(tokenFormatado, process.env.JWT_SECRET);
    req.usuario = decoded; // Adiciona os dados decodificados ao request
    next(); // Libera a rota
  } catch (erro) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = verifyToken;
