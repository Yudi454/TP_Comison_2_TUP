import { db } from "../config/DB.js";

export const getProductos = (req, res) => {
  db.query("SELECT * FROM productos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getProductoById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM productos WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(result[0]);
  });
};

export const crearProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, id_proveedor } = req.body;
  db.query("INSERT INTO productos (nombre, descripcion, precio, stock, id_proveedor) VALUES (?, ?, ?, ?, ?)",
    [nombre, descripcion, precio, stock, id_proveedor],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: result.insertId, nombre, descripcion, precio, stock, id_proveedor });
    }
  );
};

export const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, id_proveedor } = req.body;
  db.query("UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, id_proveedor=? WHERE id=?",
    [nombre, descripcion, precio, stock, id_proveedor, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ mensaje: "Producto actualizado correctamente" });
    }
  );
};

export const eliminarProducto = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM productos WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Producto eliminado" });
  });
};
