const prisma = require("../config/prisma"); //utilizo prisma
const jwt = require("jsonwebtoken");
const { hashPass } = require("../utils/hash.utils");
const enviarReuperacionPassword = require("../services/email");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "secret_key_tp";
const TOKEN_EXPIRATION = "1h";

// 📩 Generar link y enviar email
const recover = async (req, res) => {
  try {
    const { email } = req.body;

    // Buscar usuario activo
    const usuario = await prisma.usuarios.findFirst({
      where: {
        email_usuario: email,
        estado_usuario: 1,
      },
      select: { id_usuario: true },
    });

    // No revelar si el correo no existe (por seguridad)
    if (!usuario) {
      return res.json({
        message:
          "Si el correo existe, se ha enviado un enlace de recuperación.",
      });
    }

    // Generar token temporal JWT
    const token = jwt.sign({ id_usuario: usuario.id_usuario }, JWT_SECRET, {
      expiresIn: "1d",
    });

    const link = `http://localhost:5173/resetearCotrasena/${token}`;

    // Enviar correo con el link
    await enviarReuperacionPassword(email, link);

    return res.json({
      message:
        "Correo de recuperación enviado correctamente. Revisa tu bandeja de entrada.",
    });
  } catch (err) {
    console.error("Error en recover:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

// 🔐 Cambiar contraseña usando el token del link
const reset = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ error: "Token inválido o expirado" });
    }

    const id_usuario = payload.id_usuario;
    const hashedPass = await hashPass(password);

    // Actualizar contraseña solo si el usuario sigue activo
    const actualizado = await prisma.usuarios.updateMany({
      where: { id_usuario, estado_usuario: 1 },
      data: { password_usuario: hashedPass },
    });

    if (actualizado.count === 0) {
      return res
        .status(404)
        .json({ error: "Usuario no encontrado o inactivo" });
    }

    return res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error("Error en reset:", err);
    return res.status(500).json({ error: "Error del servidor" });
  }
};

module.exports = { recover, reset };
