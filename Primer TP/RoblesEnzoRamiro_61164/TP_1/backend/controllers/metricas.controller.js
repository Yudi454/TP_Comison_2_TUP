const { pool } = require('../config/db.js')

const getMetricas = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM metricas')
  res.json(rows)
}

const getMetricaById = async (req, res) => {
  const { id } = req.params
  const [rows] = await pool.query('SELECT * FROM metricas WHERE id = ?', [id])
  res.json(rows[0] || null)
}

const createMetrica = async (req, res) => {
  const { nombre, valor } = req.body
  const [result] = await pool.query('INSERT INTO metricas (nombre, valor) VALUES (?, ?)', [nombre, valor])
  res.json({ id: result.insertId, nombre, valor })
}

const updateMetrica = async (req, res) => {
  const { id } = req.params
  const { nombre, valor } = req.body
  await pool.query('UPDATE metricas SET nombre = ?, valor = ? WHERE id = ?', [nombre, valor, id])
  res.json({ id, nombre, valor })
}

const deleteMetrica = async (req, res) => {
  const { id } = req.params
  await pool.query('DELETE FROM metricas WHERE id = ?', [id])
  res.json({ message: 'Métrica eliminada' })
}

module.exports = {
  getMetricas,
  getMetricaById,
  createMetrica,
  updateMetrica,
  deleteMetrica
}
