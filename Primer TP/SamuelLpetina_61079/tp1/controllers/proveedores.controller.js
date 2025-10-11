const pool = require('../config/db');


const getProveedores = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM proveedores');
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener proveedores:', error);
    res.status(500).json({ message: 'Error al obtener proveedores' });
  }
};


const getProveedorById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM proveedores WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error al obtener proveedor:', error);
    res.status(500).json({ message: 'Error al obtener proveedor' });
  }
};

const createProveedor = async (req, res) => {
  try {
    const { nombre, telefono, email } = req.body;

    if (!nombre) {
      return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    const [result] = await pool.query(
      'INSERT INTO proveedores (nombre, telefono, email) VALUES (?, ?, ?)',
      [nombre, telefono || '', email || '']
    );

    res.status(201).json({ message: 'Proveedor creado', id: result.insertId });
  } catch (error) {
    console.error('Error al crear proveedor:', error);
    res.status(500).json({ message: 'Error al crear proveedor' });
  }
};


const updateProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, email } = req.body;

    const [result] = await pool.query(
      'UPDATE proveedores SET nombre = ?, telefono = ?, email = ? WHERE id = ?',
      [nombre, telefono, email, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json({ message: 'Proveedor actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar proveedor:', error);
    res.status(500).json({ message: 'Error al actualizar proveedor' });
  }
};


const deleteProveedor = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM proveedores WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }

    res.json({ message: 'Proveedor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar proveedor:', error);
    res.status(500).json({ message: 'Error al eliminar proveedor' });
  }
};

module.exports = {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor
};
