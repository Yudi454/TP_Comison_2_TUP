const pool = require('../config/db');

const productosController = {
  listar: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM productos ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  crear: async (req, res) => {
    const { nombre, precio, stock } = req.body;
    if (!nombre || precio == null)
      return res.status(400).json({ error: 'Nombre y precio son requeridos' });

    try {
      const [result] = await pool.query(
        'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
        [nombre, precio, stock || 0]
      );
      res.status(201).json({ id: result.insertId, nombre, precio, stock });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizar: async (req, res) => {
    const { nombre, precio, stock } = req.body;
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        'UPDATE productos SET nombre=?, precio=?, stock=? WHERE id=?',
        [nombre, precio, stock, id]
      );
      if (!result.affectedRows)
        return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ mensaje: 'Producto actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM productos WHERE id=?', [
        req.params.id,
      ]);
      if (!result.affectedRows)
        return res.status(404).json({ error: 'Producto no encontrado' });
      res.json({ mensaje: 'Producto eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = productosController;
