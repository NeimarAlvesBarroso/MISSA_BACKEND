const jwt = require("jsonwebtoken");

// Token vetorial fixo simbólico para demonstração
const TOKEN_VETORIAL = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXBlbCI6Imd1YXJkaWFvLWRvLWFjZXJ2byIsInVzdWFyaW8iOiJkZW1vIiwiaWF0IjoxNzQ4NDMyNTY0LCJleHAiOjE3Nzk5Njg1NjR9.btniAXFa3ft6wVR8-OYYNC7ln6b3qmVXmavlemYJlLM";

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: "Token não fornecido" });

  const [, token] = authHeader.split(" ");

  // ✅ Verificação simbólica vetorial
  if (token === TOKEN_VETORIAL) {
    req.usuarioId = "vetorial-demo";
    req.papel = "guardiao-do-acervo";
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "chave-secreta-missa");
    req.usuarioId = payload.id || payload.usuario;
    req.papel = payload.papel;
    next();
  } catch (err) {
    return res.status(403).json({ erro: "Token inválido ou expirado" });
  }
}

module.exports = autenticar;
