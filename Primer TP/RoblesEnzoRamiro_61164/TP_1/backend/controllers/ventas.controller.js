const { pool } = require('../config/db.js')

const getVentas = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM ventas')
  res.json(rows)
}

const getVentaById = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createVenta = async (req, res) => {
  const { id_usuario, id_producto, cantidad, total } = req.body
  const [result] = await pool.query(
    'INSERT INTO ventas (id_usuario, id_producto, cantidad, total) VALUES (?, ?, ?, ?)',
    [id_usuario, id_producto, cantidad, total]
  )
  res.json({ id: result.insertId, id_usuario, id_producto, cantidad, total })
}

const updateVenta = async (req, res) => {
  const { id } = req.params
  const { id_usuario, id_producto, cantidad, total } = req.body
  await pool.query(
    'UPDATE ventas SET id_usuario = ?, id_producto = ?, cantidad = ?, total = ? WHERE id = ?',
    [id_usuario, id_producto, cantidad, total, id]
  )
  res.json({ id, id_usuario, id_producto, cantidad, total })
}

const deleteVenta = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM ventas WHERE id = ?', [id])
  res.json({ message: 'Venta eliminada' })
}

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta
}
