import { db } from "../config/DB.js";

export const getProveedores = (req, res) => {
  db.query("SELECT * FROM proveedores", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getProveedorById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM proveedores WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Proveedor no encontrado" });
    res.json(result[0]);
  });
};

export const crearProveedor = (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;
  db.query("INSERT INTO proveedores (nombre, telefono, email, direccion) VALUES (?, ?, ?, ?)", [nombre, telefono, email, direccion], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, telefono, email, direccion });
  });
};

export const actualizarProveedor = (req, res) => {
  const { id } = req.params;
  const { nombre, telefono, email, direccion } = req.body;
  db.query("UPDATE proveedores SET nombre=?, telefono=?, email=?, direccion=? WHERE id=?", [nombre, telefono, email, direccion, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Proveedor actualizado correctamente" });
  });
};

export const eliminarProveedor = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM proveedores WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Proveedor eliminado" });
  });
};
