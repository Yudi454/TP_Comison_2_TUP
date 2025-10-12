export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Token no proporcionado" });

  // Ejemplo básico (luego se puede agregar JWT real)
  if (token === "12345") next();
  else res.status(403).json({ error: "Token inválido" });
};
