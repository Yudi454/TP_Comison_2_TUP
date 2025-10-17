const { query } = require('../config/db');


const crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, dni, email, telefono, rol } = req.body;
    const sql = `INSERT INTO usuario (nombre, apellido, dni, email, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)`;
    const result = await query(sql, [nombre, apellido, dni, email, telefono, rol]);
    res.status(201).json({ id: result.insertId, message: 'Usuario creado' });
  } catch (error) {
    res.status(error.code === 'ER_DUP_ENTRY' ? 400 : 500)
        .json({ message: error.code === 'ER_DUP_ENTRY' ? 'DNI o Email ya registrado' : 'Error al crear usuario' });
  }
};


const obtenerUsuarios = async (_req, res) => {
  try {
    const usuarios = await query('SELECT * FROM usuario WHERE activo = TRUE');
    res.json(usuarios);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};


const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await query('SELECT * FROM usuario WHERE id_usuario = ? AND activo = TRUE', [req.params.id]);
    if (!usuario.length) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(usuario[0]);
  } catch {
    res.status(500).json({ message: 'Error al obtener usuario' });
  }
};


const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const updates = Object.keys(campos)
      .filter(k => !['id_usuario', 'fecha_alta'].includes(k))
      .map(k => `${k} = ?`);
    const sql = `UPDATE usuario SET ${updates.join(', ')} WHERE id_usuario = ?`;
    const result = await query(sql, [...Object.values(campos), id]);

    if (!result.affectedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(error.code === 'ER_DUP_ENTRY' ? 400 : 500)
        .json({ message: error.code === 'ER_DUP_ENTRY' ? 'DNI o Email ya registrado' : 'Error al actualizar usuario' });
  }
};


const eliminarUsuario = async (req, res) => {
  try {
    const result = await query('UPDATE usuario SET activo = FALSE WHERE id_usuario = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json({ message: 'Usuario inactivado' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario
};
