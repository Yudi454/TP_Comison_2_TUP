const {connection} = require("../config/DB")

const getAllProducts = (req, res) => {
  const query = "SELECT * FROM productos";

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

const deleteProduct = (req, res) => {
  const  id  = req.body.id_producto;

  const query = "update productos set activo_producto = 0 where id_producto = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al eliminar el producto", details: err.message });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }

    res.status(200).send({ message: "Producto eliminado con exito." });
  });
};

const updateProduct = (req, res) => {
  const { id_producto, nombre, precio, stock, proveedor_id } = req.body;
  const query = "UPDATE productos SET nombre = ?, precio = ?, stock = ?, proveedor_id = ?,  WHERE id_producto = ?";
  connection.query(query, [nombre, precio, stock, proveedor_id, id_producto], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al actualizar el producto", details: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado." });
    }
    res.status(200).json({ message: "Producto actualizado con éxito." });
  });
};

const createProduct = (req, res) => {
  const { nombre, precio, stock, proveedor_id } = req.body;
  const query = "INSERT INTO productos (nombre, precio, stock, proveedor_id, activo_producto) VALUES (?, ?, ?, ?, 1)";
  connection.query(query, [nombre, precio, stock, proveedor_id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error al crear el producto", details: err.message });
    }
    res.status(201).json({ message: "Producto creado con éxito", id_producto: results.insertId });
  });
};

module.exports = {getAllProducts, deleteProduct, updateProduct, createProduct};