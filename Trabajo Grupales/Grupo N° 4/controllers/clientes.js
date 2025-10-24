const { pool } = require('../config/dataBase.js')

const getClientes = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM clientes')
  res.json(rows)
}

const getClienteId = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM clientes WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createCliente = async (req, res) => {
  const { nombre,telefono, email } = req.body
  const [result] = await pool.query('INSERT INTO clientes (nombre, telefono, email) VALUES (?, ?, ?)', [nombre, telefono, email])
  res.json({ id: result.insertId, nombre, telefono, email })
}

const updateCliente = async (req, res) => {
  const { id } = req.params
  const { nombre, telefono, email } = req.body
  await pool.query('UPDATE clientes SET nombre = ?, telefono = ?, email = ? WHERE id = ?', [nombre, telefono, email, id])
  res.json({ id, nombre, telefono, email })
}

const deleteCliente = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM clientes WHERE id = ?', [id])
  res.json({ message: 'cliente eliminado' })
}

module.exports = {
getClientes,
getClienteId,
createCliente,
updateCliente,
deleteCliente
}
