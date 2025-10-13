const pool = require('../config/db');

const usuariosController = {
  listar: async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM usuarios ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  crear: async (req, res) => {
    const { nombre, puesto } = req.body;
    if (!nombre || !puesto)
      return res.status(400).json({ error: 'Nombre y puesto son requeridos' });

    try {
      const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, puesto) VALUES (?, ?)',
        [nombre, puesto]
      );
      res.status(201).json({ id: result.insertId, nombre, puesto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  actualizar: async (req, res) => {
    const { nombre, puesto } = req.body;
    const { id } = req.params;
    try {
      const [result] = await pool.query(
        'UPDATE usuarios SET nombre=?, puesto=? WHERE id=?',
        [nombre, puesto, id]
      );
      if (!result.affectedRows)
        return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ mensaje: 'Usuario actualizado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  eliminar: async (req, res) => {
    try {
      const [result] = await pool.query('DELETE FROM usuarios WHERE id=?', [
        req.params.id,
      ]);
      if (!result.affectedRows)
        return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json({ mensaje: 'Usuario eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = usuariosController;
