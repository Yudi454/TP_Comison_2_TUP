import { pool } from "../config/DB.js";

export const listar = async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios ORDER BY id DESC");
  res.json(rows);
};

export const obtener = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM usuarios WHERE id=?", [
    req.params.id,
  ]);
  if (!rows.length) return res.status(404).json({ error: "No encontrado" });
  res.json(rows[0]);
};

export const crear = async (req, res) => {
  const { nombre, email } = req.body;
  const [r] = await pool.query(
    "INSERT INTO usuarios (nombre, email) VALUES (?,?)",
    [nombre, email]
  );
  res.status(201).json({ id: r.insertId, nombre, email });
};

export const actualizar = async (req, res) => {
  const { nombre, email } = req.body;
  await pool.query("UPDATE usuarios SET nombre=?, email=? WHERE id=?", [
    nombre,
    email,
    req.params.id,
  ]);
  res.json({ ok: true });
};

export const eliminar = async (req, res) => {
  await pool.query("DELETE FROM usuarios WHERE id=?", [req.params.id]);
  res.json({ ok: true });
};
