const pool = require("../config/DB");
const jwt = require("jsonwebtoken"); // Importar el jwt, para usarlo
const { hashPassword, comparePassword } = require("../utils/hash.utils");


//traigo la clave secreta para el token y la expiracion

const SECRET_KEY = process.env.JWT_SECRET;
const TOKEN_EXPIRATION = process.env.JWT_EXPIRES_IN;

//Registrarse
const register = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const hash = await hashPassword(contraseña);

    const consulta =
      "INSERT INTO usuarios (nombre_usuario,contraseña) VALUES (?,?)";

    pool.query(consulta, [usuario, hash], (err, results) => {
      if (err) {
        console.log(err);

        return res.status(500).json({ message: "Error al registrarse" });
      }


      // crear el token para registrarse

      const token = jwt.sign(
        { nombre_usuario: usuario },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRATION }
      );

      return res.status(201).json({ message: "Usuario registrado con exito",  token: token });
    });
  } catch (error) {
    return res.json(error);
  }
};

//Iniciar sesion
const login = (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    const consulta = "SELECT contraseña FROM usuarios WHERE nombre_usuario = ?";

    pool.query(consulta, [usuario], async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Error al buscar el usuario" });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const hash = results[0].contraseña;

      const esValida = await comparePassword(contraseña, hash);

      if (!esValida) {
        return res.status(401).json({ message: "Contraseña incorrecta " });
      } else {

         //creacion del token para iniciar la sesion

         const token = jwt.sign(
        { id_usuario: user.id_usuario, nombre_usuario: user.nombre_usuario },
        SECRET_KEY,
        { expiresIn: TOKEN_EXPIRATION }
      );

        return res.status(200).json({ message: "Usuario logueado con exito",  token: token });
      }
    });
  } catch (error) {
    return res.json(error);
  }
};

module.exports = {
  register,
  login,
};
