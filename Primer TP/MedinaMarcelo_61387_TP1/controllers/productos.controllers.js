const { query } = require('../config/db');


const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, costo, id_proveedor } = req.body;
    const sql = `INSERT INTO productos (nombre, descripcion, precio, costo, id_proveedor) VALUES (?, ?, ?, ?, ?)`;
    const result = await query(sql, [nombre, descripcion, precio, costo, id_proveedor || null]);
    res.status(201).json({ id: result.insertId, message: 'Producto creado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear producto' });
  }
};

const obtenerProductos = async (_req, res) => {
  try {
    const sql = `
      SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.costo, 
              p.fecha_de_creacion, p.id_proveedor, pr.nombre AS proveedor
      FROM productos p
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
    `;
    const productos = await query(sql);
    res.json(productos);
  } catch {
    res.status(500).json({ message: 'Error al obtener productos' });
  }
};

const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = `
      SELECT p.id_producto, p.nombre, p.descripcion, p.precio, p.costo,
              p.fecha_de_creacion, p.id_proveedor, pr.nombre AS proveedor
      FROM productos p
      LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
      WHERE p.id_producto = ?
    `;
    const producto = await query(sql, [id]);
    if (!producto.length) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto[0]);
  } catch {
    res.status(500).json({ message: 'Error al obtener producto' });
  }
};


const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const updates = Object.keys(campos)
      .filter(k => k !== 'id_producto' && k !== 'fecha_de_creacion')
      .map(k => `${k} = ?`);
    const values = Object.values(campos);

    if (!updates.length) return res.status(400).json({ message: 'Sin campos para actualizar' });

    const sql = `UPDATE productos SET ${updates.join(', ')} WHERE id_producto = ?`;
    const result = await query(sql, [...values, id]);

    if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto actualizado' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar producto' });
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM productos WHERE id_producto = ?', [id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  eliminarProducto
};
