const { query } = require('../config/db');

const crearProveedor = async (req, res) => {
  try {
    const { nombre, domicilio, telefono, email } = req.body;
    const sql = `INSERT INTO proveedores (nombre, domicilio, telefono, email) VALUES (?, ?, ?, ?)`;
    const result = await query(sql, [nombre, domicilio, telefono, email]);
    res.status(201).json({ id: result.insertId, message: 'Proveedor creado' });
  } catch (error) {
    res.status(error.code === 'ER_DUP_ENTRY' ? 400 : 500)
        .json({ message: error.code === 'ER_DUP_ENTRY' ? 'Email ya registrado' : 'Error al crear proveedor' });
  }
};


const obtenerProveedores = async (_req, res) => {
  try {
    const proveedores = await query('SELECT * FROM proveedores');
    res.json(proveedores);
  } catch {
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};


const obtenerProveedorPorId = async (req, res) => {
  try {
    const proveedor = await query('SELECT * FROM proveedores WHERE id_proveedor = ?', [req.params.id]);
    if (!proveedor.length) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(proveedor[0]);
  } catch {
    res.status(500).json({ message: 'Error al obtener proveedor' });
  }
};

const actualizarProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const updates = Object.keys(campos).map(k => `${k} = ?`);
    const sql = `UPDATE proveedores SET ${updates.join(', ')} WHERE id_proveedor = ?`;
    const result = await query(sql, [...Object.values(campos), id]);

    if (!result.affectedRows) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor actualizado' });
  } catch (error) {
    res.status(error.code === 'ER_DUP_ENTRY' ? 400 : 500)
        .json({ message: error.code === 'ER_DUP_ENTRY' ? 'Email ya registrado' : 'Error al actualizar proveedor' });
  }
};

const eliminarProveedor = async (req, res) => {
  try {
    const result = await query('DELETE FROM proveedores WHERE id_proveedor = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar proveedor' });
  }
};

module.exports = {
  crearProveedor,
  obtenerProveedores,
  obtenerProveedorPorId,
  actualizarProveedor,
  eliminarProveedor
};
