import { db } from "../config/DB.js";

export const getUsuarios = (req, res) => {
  db.query("SELECT * FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

export const getUsuarioById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM usuarios WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(result[0]);
  });
};

export const crearUsuario = (req, res) => {
  const { nombre, email, rol } = req.body;
  db.query("INSERT INTO usuarios (nombre, email, rol) VALUES (?, ?, ?)", [nombre, email, rol], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, nombre, email, rol });
  });
};

export const actualizarUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, email, rol } = req.body;
  db.query("UPDATE usuarios SET nombre=?, email=?, rol=? WHERE id=?", [nombre, email, rol, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Usuario actualizado correctamente" });
  });
};

export const eliminarUsuario = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ mensaje: "Usuario eliminado" });
  });
};
