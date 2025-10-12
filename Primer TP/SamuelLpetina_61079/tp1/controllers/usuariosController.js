const pool = require('../config/db'); // ajustá la ruta según tu estructura


const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};


const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};

const createUsuario = async (req, res) => {
  try {
    const { nombre, usuario, password, rol } = req.body;

    if (!nombre || !usuario || !password) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, usuario, password, rol) VALUES (?, ?, ?, ?)',
      [nombre, usuario, password, rol || 'empleado']
    );

    res.status(201).json({ message: 'Usuario creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario' });
  }
};


const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, usuario, password, rol } = req.body;

    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, usuario = ?, password = ?, rol = ? WHERE id = ?',
      [nombre, usuario, password, rol, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};


const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};


module.exports = {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
