import pool from '../config/db.js';

export const getProveedores = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM proveedores');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProveedor = async (req, res) => {
    try {
        const { nombre, cuit, telefono, direccion } = req.body;
        const [result] = await pool.query('INSERT INTO proveedores (nombre, cuit, telefono, direccion) VALUES (?, ?, ?, ?)', [nombre, cuit, telefono, direccion]);
        res.status(201).json({ id: result.insertId, nombre, cuit, telefono, direccion });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cuit, telefono, direccion } = req.body;
        const [result] = await pool.query('UPDATE proveedores SET nombre = ?, cuit = ?, telefono = ?, direccion = ? WHERE id_proveedor = ?', [nombre, cuit, telefono, direccion, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.json({ message: 'Proveedor actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProveedor = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM proveedores WHERE id_proveedor = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
        res.json({ message: 'Proveedor eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};