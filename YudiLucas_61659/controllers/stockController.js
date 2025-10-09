const conection = require("../config/db");

//Traer todos los stock
const getAllStock = (req, res) => {
  const consulta = "SELECT * FROM stock WHERE estado = 1";

  conection.query(consulta, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Error al obtener los stocks" });
    }

    return res.json(results);
  });
};

//Traer un Stock
const getOneStock = (req, res) => {
  const { id } = req.params;

  const consulta = "SELECT * FROM stock WHERE id_stock=?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al obtener el stock" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json(results[0]);
  });
};

//Borrar stock
const deleteStock = (req, res) => {
  const { id } = req.params;

  const consulta = "UPDATE stock SET estadoo = false WHERE id_stock=?";

  conection.query(consulta, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al eliminar el stock" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Stock no encontrado" });
    }

    return res.status(200).json({ message: "Stock eliminado correctamente" });
  });
};

//Actualizar stock
const updateStock = (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  const consulta = "UPDATE stock SET cantidad=? WHERE id_stock=?";

  conection.query(consulta, [cantidad, id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al actualizar el stock" });
    }

    if (results.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "No se encontro el stock para actualizar" });
    }

    return res.status(200).json({ message: "Stock actualizado correctamente" });
  });
};

//Crear stock
const createStock = (req, res) => {
  const { id_producto, cantidad } = req.body;

  const consulta = "INSERT INTO stock (id_producto,cantidad) VALUES (?,?)";

  conection.query(consulta, [id_producto, cantidad], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error al crear el stock" });
    }

    return res.status(201).json({ message: "Stock creado correctamente" });
  });
};

module.exports = {
  getAllStock,
  getOneStock,
  deleteStock,
  updateStock,
  createStock,
};
