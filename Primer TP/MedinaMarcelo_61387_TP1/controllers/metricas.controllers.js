const db = require('../config/db');

const getResumenVentas = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.nombre, 
             SUM(mv.cantidad) AS total_vendido, 
             SUM(mv.cantidad * mv.precio_unitario) AS ingresos
      FROM metricas_venta mv
      JOIN productos p ON mv.id_producto = p.id_producto
      GROUP BY mv.id_producto
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el resumen de ventas' });
  }
};

const agregarDetalleVenta = async (req, res) => {
  try {
    const { id_venta, id_producto, cantidad, precio_unitario } = req.body;

    const [result] = await db.query(
      'INSERT INTO metricas_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
      [id_venta, id_producto, cantidad, precio_unitario]
    );

    await db.query(
      'UPDATE stock SET cantidad = cantidad - ? WHERE id_producto = ?',
      [cantidad, id_producto]
    );

    res.json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar detalle de venta' });
  }
};

const ventasPorDia = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT DATE(fecha_de_venta) AS fecha, 
             SUM(total_venta) AS total
      FROM ventas
      GROUP BY DATE(fecha_de_venta)
      ORDER BY fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas por día' });
  }
};

const ventasPorSemana = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT YEAR(fecha_de_venta) AS año, 
             WEEK(fecha_de_venta, 1) AS semana, 
             SUM(total_venta) AS total
      FROM ventas
      GROUP BY año, semana
      
      ORDER BY año DESC, semana DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ventas por semana' });
  }
};

module.exports = {
  getResumenVentas,
  agregarDetalleVenta,
  ventasPorDia,
  ventasPorSemana
};
