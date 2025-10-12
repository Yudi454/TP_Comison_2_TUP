const { pool } = require('../config/db.js')

const getUsuarios = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM usuarios')
  res.json(rows)
}

const getUsuarioById = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createUsuario = async (req, res) => {
  const { nombre, email } = req.body
  const [result] = await pool.query('INSERT INTO usuarios (nombre, email) VALUES (?, ?)', [nombre, email])
  res.json({ id: result.insertId, nombre, email })
}

const updateUsuario = async (req, res) => {
  const { id } = req.params
  const { nombre, email } = req.body
  await pool.query('UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?', [nombre, email, id])
  res.json({ id, nombre, email })
}

const deleteUsuario = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM usuarios WHERE id = ?', [id])
  res.json({ message: 'Usuario eliminado' })
}

module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
}
