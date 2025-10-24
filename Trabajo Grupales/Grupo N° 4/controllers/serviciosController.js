const { pool } = require('../config/dataBase.js')

const getservicios = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM servicio')
  res.json(rows)
}

const getserviciosID = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM servicios WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createservicios= async (req, res) => {
  const { nombre,precio} = req.body
  const [result] = await pool.query('INSERT INTO servicios (nombre, precio) VALUES (?, ?)', [nombre, precio])
  res.json({ id: result.insertId, nombre, precio})
}

const updateservicios = async (req, res) => {
  const { id } = req.params
  const { nombre, precio } = req.body
  await pool.query('UPDATE servicios SET nombre = ?,precio=?  WHERE id = ?', [nombre, precio, id])
  res.json({ id, nombre, precio })
}

const deleteservicios = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM servicios WHERE id = ?', [id])
  res.json({ message: 'servicio eliminado' })
}

module.exports = {
getserviciosID,
getservicios,
createservicios,
updateservicios,
deleteservicios
}
