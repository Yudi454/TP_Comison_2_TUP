const pool = require('../config/db');

const getProductos = async (req, res) => {
  try {
    const [productos] = await pool.query('SELECT * FROM productos');
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};


const getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (producto.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json(producto[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener producto' });
  }
};

const createProducto = async (req, res) => {
  try {
    const { nombre, precio, stock, proveedor_id } = req.body;
    if (!nombre || !precio) return res.status(400).json({ message: 'Nombre y precio son obligatorios' });

    const [result] = await pool.query(
      'INSERT INTO productos (nombre, precio, stock, proveedor_id) VALUES (?, ?, ?, ?)',
      [nombre, precio, stock || 0, proveedor_id || null]
    );

    res.status(201).json({ message: 'Producto creado', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

const updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precio, stock, proveedor_id } = req.body;

    const [result] = await pool.query(
      'UPDATE productos SET nombre = ?, precio = ?, stock = ?, proveedor_id = ? WHERE id = ?',
      [nombre, precio, stock, proveedor_id, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({ message: 'Producto actualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};


const deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });

    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

module.exports = {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
};
