const pool = require('../config/db');


const totalVentas = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT SUM(total) AS total_ventas FROM ventas');
    res.json({ total_ventas: rows[0].total_ventas || 0 });
  } catch (error) {
    console.error('Error totalVentas:', error);
    res.status(500).json({ message: 'Error al obtener total de ventas' });
  }
};

const productosMasVendidos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.nombre, SUM(d.cantidad) AS total_vendido
      FROM venta_detalle d
      JOIN productos p ON p.id = d.producto_id
      GROUP BY p.id
      ORDER BY total_vendido DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error productosMasVendidos:', error);
    res.status(500).json({ message: 'Error al obtener productos más vendidos' });
  }
};


const stockBajo = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT nombre, stock FROM productos WHERE stock < 5');
    res.json(rows);
  } catch (error) {
    console.error('Error stockBajo:', error);
    res.status(500).json({ message: 'Error al obtener productos con stock bajo' });
  }
};

module.exports = {
  totalVentas,
  productosMasVendidos,
  stockBajo,
};
