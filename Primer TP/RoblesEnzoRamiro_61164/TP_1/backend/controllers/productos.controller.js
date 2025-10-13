const { pool } = require('../config/db.js')

const getProductos = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM productos')
  res.json(rows)
}

const getProductoById = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createProducto = async (req, res) => {
  const { nombre, precio, id_proveedor } = req.body
  const [result] = await pool.query('INSERT INTO productos (nombre, precio, id_proveedor) VALUES (?, ?, ?)', [nombre, precio, id_proveedor])
  res.json({ id: result.insertId, nombre, precio, id_proveedor })
}

const updateProducto = async (req, res) => {
  const { id } = req.params
  const { nombre, precio, id_proveedor } = req.body
  await pool.query('UPDATE productos SET nombre = ?, precio = ?, id_proveedor = ? WHERE id = ?', [nombre, precio, id_proveedor, id])
  res.json({ id, nombre, precio, id_proveedor })
}

const deleteProducto = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM productos WHERE id = ?', [id])
  res.json({ message: 'Producto eliminado' })
}

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
}
