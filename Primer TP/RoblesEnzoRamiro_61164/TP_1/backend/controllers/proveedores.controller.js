const { pool } = require('../config/db.js')

const getProveedores = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM proveedores')
  res.json(rows)
}

const getProveedorById = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createProveedor = async (req, res) => {
  const { nombre, telefono } = req.body
  const [result] = await pool.query('INSERT INTO proveedores (nombre, telefono) VALUES (?, ?)', [nombre, telefono])
  res.json({ id: result.insertId, nombre, telefono })
}

const updateProveedor = async (req, res) => {
  const { id } = req.params
  const { nombre, telefono } = req.body
  await pool.query('UPDATE proveedores SET nombre = ?, telefono = ? WHERE id = ?', [nombre, telefono, id])
  res.json({ id, nombre, telefono })
}

const deleteProveedor = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM proveedores WHERE id = ?', [id])
  res.json({ message: 'Proveedor eliminado' })
}

module.exports = {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor
}
