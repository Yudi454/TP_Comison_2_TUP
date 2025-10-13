const pool = require('../config/db');

const proveedoresController = {
  listar: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM proveedores ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  crear: async (req, res) => {
    const { nombre, telefono, mail } = req.body;
    if (!nombre) return res.status(400).json({ error: 'Nombre es requerido' });

    try {
      const [result] = await pool.query(
        'INSERT INTO proveedores (nombre, telefono, mail) VALUES (?, ?, ?)',
        [nombre, telefono || null, mail || null]
      );
      res.status(201).json({ id: result.insertId, nombre, telefono, mail });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizar: async (req, res) => {
    const { nombre, telefono, mail } = req.body;
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        'UPDATE proveedores SET nombre=?, telefono=?, mail=? WHERE id=?',
        [nombre, telefono, mail, id]
      );
      if (!result.affectedRows)
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json({ mensaje: 'Proveedor actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM proveedores WHERE id=?', [
        req.params.id,
      ]);
      if (!result.affectedRows)
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json({ mensaje: 'Proveedor eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = proveedoresController;
