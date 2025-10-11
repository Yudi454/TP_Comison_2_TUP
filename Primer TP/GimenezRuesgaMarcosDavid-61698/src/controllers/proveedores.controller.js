import db from "../config/db.js";

// Traer todos los Proveedores

export const traerProveedores = async (req, res) => {
  try {
    const traerTodosLosProveedores = `SELECT * FROM Proveedores`;
    db.query(traerTodosLosProveedores, (error, results) => {
      if (error) {
        console.error(" Error al traer los Proveedores", error);
        return res.status(500).json({
          message: "Error al traer los Proveedores",
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

export const traerProveedoresActivos = async (req, res) => {
  try {
    const activos = `SELECT * FROM Proveedores WHERE isActive = 1`;
    db.query(activos, (error, results) => {
      if (error) {
        console.error("Error al traer proveedores activas", error);
        return res.status(500).json({
          message: "Error al traer proveedores activas",
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

// Crear Proveedores

export const crearProveedor = async (req, res) => {
  try {
    // traer los datos del body
    const { nombreProveedor, direccionProveedor, telefonoProveedor } = req.body;

    const nuevoProveedor = `INSERT INTO Proveedores (nombreProveedor, direccionProveedor,telefonoProveedor) VALUES (?,?,?)`;

    db.query(
      nuevoProveedor,
      [nombreProveedor, direccionProveedor, telefonoProveedor],
      (error, results) => {
        if (error) {
          console.error("Error al crear Proveedor", error);
          return res.status(500).json({
            message: "Error al crear Proveedor",
          });
        }
        res.status(201).json({
          message: "Proveedor creado exitosamente",
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

// Actualizar Proveedor

export const actualizarProveedor = async (req, res) => {
  try {
    const { idProveedor } = req.params;
    // traer los datos del body
    const { nombreProveedor, direccionProveedor, telefonoProveedor } = req.body;

    const actualizar = `UPDATE Proveedores SET nombreProveedor = ?, direccionProveedor = ?, telefonoProveedor = ? WHERE idProveedor = ?`;
    db.query(
      actualizar,
      [nombreProveedor, direccionProveedor, telefonoProveedor, idProveedor],
      (error, results) => {
        if (error) {
          console.error("Error al actualizar el Proveedor", error);
          return res.status(500).json({
            message: "Error al actualizar el Proveedor",
          });
        }
        res.status(200).json({
          message: "Proveedor actualizado exitosamente",
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

export const borradoLogicoProveedor = async (req, res) => {
  try {
    const { idProveedor } = req.params;
    const borradoLogico = `UPDATE Proveedores SET IsActive = 0 WHERE idProveedor = ?`;
    db.query(borradoLogico, [idProveedor], (error, results) => {
      if (error) {
        console.error("Error al eliminar el Proveedor", error);
        return res.status(500).json({
          message: "Error al eliminar el Proveedor",
        });
      }
      res.status(200).json({
        message: "Proveedor eliminado exitosamente",
      });
    });
  } catch (error) {
    console.error("Error del servidor:", error);
    res.status(500).json({
      message: "Error del servidor",
    });
  }
};
