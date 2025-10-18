import { db } from "../config/DB.js";

export const getVentas = (req, res) => {
  db.query("SELECT * FROM ventas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getVentaById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM ventas WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Venta no encontrada" });
    res.json(result[0]);
  });
};

export const crearVenta = (req, res) => {
  const { id_usuario, total } = req.body;
  db.query("INSERT INTO ventas (id_usuario, total) VALUES (?, ?)", [id_usuario, total], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, id_usuario, total });
  });
};

export const eliminarVenta = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM ventas WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Venta eliminada" });
  });
};
