import pool from '../config/db.js';

//Obtener datos de todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Crear un nuevo usuario

export const createUsuario = async (req, res) => {
    try {
        const { nombre, apellido, email, telefono, puesto } = req.body;
        const [result] = await pool.query(
        'INSERT INTO usuarios (nombre, apellido, email, telefono, puesto) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, email, telefono, puesto]
    );
    res.status(201).json({ id: result.insertId, nombre, apellido, email, telefono, puesto });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//Actualizar un usuario

export const updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, apellido, email, telefono, puesto } = req.body;
        const [result] = await pool.query(
            'UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, telefono = ?, puesto = ? WHERE id_usuario = ?',
            [nombre, apellido, email, telefono, puesto, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//Eliminar un usuario

export const deleteUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json({ message: "Usuario eliminado" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };