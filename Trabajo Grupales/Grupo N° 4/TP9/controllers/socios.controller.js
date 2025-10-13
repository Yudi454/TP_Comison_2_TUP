const pool = require('../config/DB');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM socios');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { nombre, dni, telefono, email } = req.body;
  try {
    const [result] = await pool
      .promise()
      .query('INSERT INTO socios (nombre, dni, telefono, email) VALUES (?,?,?,?)', [
        nombre,
        dni,
        telefono,
        email,
      ]);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};