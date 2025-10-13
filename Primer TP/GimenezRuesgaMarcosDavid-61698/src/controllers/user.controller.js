import db from "../config/db.js";

// Traer todos los usuarios

export const traerUsuarios = async (req, res) => {
  try {
    const traerTodosLosUsuarios = `SELECT * FROM USUARIOS`;
    db.query(traerTodosLosUsuarios, (error, results) => {
      if (error) {
        console.error(" Error al traer los usuarios", error);
        return res.status(500).json({
          message: "Error al traer los usuarios",
        });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// traer personas activas

export const traerUsuariosActivos = async (req, res) => {
  try {
    const activos = `SELECT * FROM USUARIOS WHERE isActive = 1`;
    db.query(activos, (error, results) => {
      if (error) {
        console.error("Error al traer personas activas", error);
        return res.status(500).json({
          message: "Error al traer personas activas",
        });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// Crear usuarios

export const crearUsuario = async (req, res) => {
  try {
    // traer los datos del body
    const {
      nombreUsuario,
      apellidoUsuario,
      direccionUsuario,
      telefonoUsuario,
      emailUsuario,
      contrasenaUsuario,
    } = req.body;

    const nuevoUsuario = `INSERT INTO USUARIOS (nombreUsuario, apellidoUsuario, direccionUsuario,telefonoUsuario, emailUsuario, contrasenaUsuario) VALUES (?,?,?,?,?,?)`;

    db.query(
      nuevoUsuario,
      [
        nombreUsuario,
        apellidoUsuario,
        direccionUsuario,
        telefonoUsuario,
        emailUsuario,
        contrasenaUsuario,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al crear usuario", error);
          return res.status(500).json({
            message: "Error al crear usuario",
          });
        }
        res.status(201).json({
          message: "Usuario creado exitosamente",
          idInsertado: results.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// Actualizar usuario

export const actualizarUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    // traer los datos del body
    const {
      nombreUsuario,
      apellidoUsuario,
      direccionUsuario,
      telefonoUsuario,
      emailUsuario,
      contrasenaUsuario,
    } = req.body;

    const actualizar = `UPDATE USUARIOS SET nombreUsuario = ?, apellidoUsuario = ?, direccionUsuario = ?, telefonoUsuario = ?, emailUsuario = ? , contrasenaUsuario = ? WHERE idUsuario = ?`;
    db.query(
      actualizar,
      [
        nombreUsuario,
        apellidoUsuario,
        direccionUsuario,
        telefonoUsuario,
        emailUsuario,
        contrasenaUsuario,
        idUsuario,
      ],
      (error, results) => {
        if (error) {
          console.error("Error al actualizar el usuario", error);
          return res.status(500).json({
            message: "Error al actualizar el usuario",
          });
        }
        res.status(200).json({
          message: "Usuario actualizado exitosamente",
        });
      }
    );
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};

// borrado logico

export const borradoLogicoUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const borradoLogico = `UPDATE USUARIOS SET IsActive = 0 WHERE idUsuario = ?`;
    db.query(borradoLogico, [idUsuario], (error, results) => {
      if (error) {
        console.error("Error al eliminar el usuario", error);
        return res.status(500).json({
          message: "Error al eliminar el usuario",
        });
      }
      res.status(200).json({
        message: "Usuario eliminado exitosamente",
      });
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
