const jwt = require("jsonwebtoken");

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  const [, token] = authHeader.split(" ");
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = payload.id;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = autenticar;
