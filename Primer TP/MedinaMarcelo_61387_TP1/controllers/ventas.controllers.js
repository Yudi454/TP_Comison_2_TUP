const db = require('../config/db');

const crearVenta = async (req, res) => {
  try {
    const { total_venta, metodo_pago, id_usuario } = req.body;
    const [result] = await db.query(
      'INSERT INTO ventas (total_venta, metodo_pago, id_usuario) VALUES (?, ?, ?)',
      [total_venta, metodo_pago, id_usuario]
    );
    res.status(201).json({ id_venta: result.insertId, message: 'Venta registrada' });
  } catch {
    res.status(500).json({ message: 'Error al registrar venta' });
  }
};

const obtenerVentas = async (_req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.id_venta, v.fecha_de_venta, v.total_venta, v.metodo_pago,
              u.nombre AS usuario_nombre, u.apellido AS usuario_apellido
      FROM ventas v
      JOIN usuario u ON v.id_usuario = u.id_usuario
      ORDER BY v.fecha_de_venta DESC
    `);
    res.json(rows);
  } catch {
    res.status(500).json({ message: 'Error al obtener ventas' });
  }
};

const obtenerVentaPorId = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.id_venta, v.fecha_de_venta, v.total_venta, v.metodo_pago,
              u.nombre AS usuario_nombre, u.apellido AS usuario_apellido
      FROM ventas v
      JOIN usuario u ON v.id_usuario = u.id_usuario
      WHERE v.id_venta = ?
    `, [req.params.id]);

    if (!rows.length) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json(rows[0]);
  } catch {
    res.status(500).json({ message: 'Error al obtener venta' });
  }
};


const actualizarVenta = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    const updates = Object.keys(campos)
      .filter(k => ['total_venta', 'metodo_pago', 'id_usuario'].includes(k))
      .map(k => `${k} = ?`);
    if (!updates.length) return res.status(400).json({ message: 'Sin campos válidos' });

    const sql = `UPDATE ventas SET ${updates.join(', ')} WHERE id_venta = ?`;
    const [result] = await db.query(sql, [...Object.values(campos), id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Venta no encontrada' });

    res.json({ message: 'Venta actualizada' });
  } catch {
    res.status(500).json({ message: 'Error al actualizar venta' });
  }
};


const eliminarVenta = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM ventas WHERE id_venta = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Venta no encontrada' });
    res.json({ message: 'Venta eliminada' });
  } catch {
    res.status(500).json({ message: 'Error al eliminar venta' });
  }
};

module.exports = {
  crearVenta,
  obtenerVentas,
  obtenerVentaPorId,
  actualizarVenta,
  eliminarVenta
};
