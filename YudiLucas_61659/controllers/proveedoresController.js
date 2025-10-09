const conection = require("../config/db");

//Traer todos los proveedores
const getAllProveedores = (req, res) => {
  const consulta = "SELECT * FROM proveedores WHERE estado = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error al obtener los producto" });
    }

    return res.json(results);
  });
};

//Traer un proveedor
const getOneProveedor = (req, res) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM proveedores where id_proveedor=?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener el producto" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.json(results[0]);
  });
};

//Borrar proveedor
const deleteProveedor = (req, res) => {
  const { id } = req.params;

  const consulta = "UPDATE proveedores SET estado = FALSE WHERE id_proveedor=?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar el usuario" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ messsage: "Proveedor no encontrado" });
    }

    return res
      .status(200)
      .json({ message: "Proveedor eliminado correctamente" });
  });
};

//Actualizar proveedor
const updateProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono } = req.body;

  const consulta =
    "UPDATE proveedores SET nombre=?, telefono=? WHERE id_proveedor=?";

  conection.query(consulta, [nombre, telefono, id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error al actualizar el proveedor" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se encontro el proveedor para actualizar" });
    }

    return res.status(200).json({ message: "Proveedor actualizado con exito" });
  });
};

//Crear proveedor
const createProveedor = (req, res) => {
  const { nombre, telefono } = req.body;

  const consulta = "INSERT INTO proveedores (nombre,telefono) VALUES (?,?)";

  conection.query(consulta, [nombre, telefono], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al crear el proveedor" });
    }

    return res.status(201).json({ message: "Proveedor creado correctamente" });
  });
};

module.exports = {
  getAllProveedores,
  getOneProveedor,
  deleteProveedor,
  updateProveedor,
  createProveedor
}