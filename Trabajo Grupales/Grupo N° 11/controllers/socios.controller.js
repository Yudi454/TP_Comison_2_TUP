const pool = require('../config/db');

const sociosController = {
    listar: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM socios ORDER BY id DESC');
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    obtener: async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT * FROM socios WHERE id = ?', [req.params.id]);
            if (!rows.length) return res.status(404).json({ error: 'Socio no encontrado' });
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    crear: async (req, res) => {
        const { nombre, dni, telefono, email } = req.body;
        if (!nombre || !dni) return res.status(400).json({ error: 'Nombre y DNI son requeridos' });
        try {
            const [result] = await pool.query(
                'INSERT INTO socios (nombre, dni, telefono, email) VALUES (?, ?, ?, ?)',
                [nombre, dni, telefono || null, email || null]
            );
            res.status(201).json({ id: result.insertId, nombre, dni });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    actualizar: async (req, res) => {
        const { nombre, dni, telefono, email } = req.body;
        try {
            const [result] = await pool.query(
                'UPDATE socios SET nombre=?, dni=?, telefono=?, email=? WHERE id=?',
                [nombre, dni, telefono, email, req.params.id]
            );
            if (!result.affectedRows) return res.status(404).json({ error: 'Socio no encontrado' });
            res.json({ mensaje: 'Socio actualizado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    eliminar: async (req, res) => {
        try {
            const [result] = await pool.query('DELETE FROM socios WHERE id=?', [req.params.id]);
            if (!result.affectedRows) return res.status(404).json({ error: 'Socio no encontrado' });
            res.json({ mensaje: 'Socio eliminado' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

module.exports = sociosController;
