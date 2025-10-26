// Importamos jsonwebtoken para manejar los tokens JWT
const jwt = require("jsonwebtoken");
const pool = require("../config/database"); // Importamos el pool en lugar de conection

// Tomamos la clave secreta desde variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;

// Función para autenticar el login
const authLogin = (req, res) => {
  const { email, password } = req.body;

  // Validamos que estén ambos campos
  if (!email || !password) {
    return res.status(400).json({ message: "Faltan email o contraseña" });
  }

  // Consulta SQL
  const consulta = "SELECT * FROM usuarios WHERE correo = ? LIMIT 1";

  // Usamos el pool para hacer la consulta
  pool.query(consulta, [email], (err, results) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ message: "Error en la consulta", error: err });
    }

    // Si no encontró ningún usuario
    if (results.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const usuario = results[0];

    // Verificamos contraseña (no encriptada)
    if (password !== usuario.contrasena) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generamos token JWT con datos del usuario
    const token = jwt.sign(
      {
        id: usuario.usuario_id,
        nombre: usuario.nombre,
        email: usuario.correo,
        rol: usuario.rol,
      },
      JWT_SECRET,
      { expiresIn: "6h" } // opcional, por seguridad
    );

    // Respondemos con el token y los datos
    return res.status(200).json({
      token,
      usuario_id: usuario.usuario_id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      rol: usuario.rol,
    });
  });
};

// Exportamos la función
module.exports = { authLogin };
