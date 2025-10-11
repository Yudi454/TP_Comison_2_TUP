const pool = require('../config/db');


const getVentas = async (req, res) => {
  try {
    const [ventas] = await pool.query('SELECT * FROM ventas');
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas' });
  }
};


const getVentaById = async (req, res) => {
  try {
    const { id } = req.params;
    const [venta] = await pool.query('SELECT * FROM ventas WHERE id = ?', [id]);
    if (venta.length === 0) return res.status(404).json({ message: 'Venta no encontrada' });

    const [detalle] = await pool.query(
      'SELECT vd.*, p.nombre FROM venta_detalle vd JOIN productos p ON p.id = vd.producto_id WHERE vd.venta_id = ?',
      [id]
    );

    res.json({ venta: venta[0], detalle });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener venta' });
  }
};


const createVenta = async (req, res) => {
  try {
    const { usuario_id, items } = req.body; // items = [{producto_id, cantidad, precio}]
    if (!items || items.length === 0) return res.status(400).json({ message: 'Agrega al menos un producto' });

    let total = items.reduce((sum, item) => sum + item.cantidad * item.precio, 0);

   
    const [result] = await pool.query('INSERT INTO ventas (usuario_id, total) VALUES (?, ?)', [usuario_id, total]);
    const ventaId = result.insertId;

  
    for (const item of items) {
      const subtotal = item.cantidad * item.precio;
      await pool.query(
        'INSERT INTO venta_detalle (venta_id, producto_id, cantidad, precio, subtotal) VALUES (?, ?, ?, ?, ?)',
        [ventaId, item.producto_id, item.cantidad, item.precio, subtotal]
      );
      await pool.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [item.cantidad, item.producto_id]);
    }

    res.status(201).json({ message: 'Venta creada', id: ventaId });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear venta' });
  }
};

const deleteVenta = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM venta_detalle WHERE venta_id = ?', [id]);
    const [result] = await pool.query('DELETE FROM ventas WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Venta no encontrada' });

    res.json({ message: 'Venta eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar venta' });
  }
};

module.exports = {
  getVentas,
  getVentaById,
  createVenta,
  deleteVenta
};
