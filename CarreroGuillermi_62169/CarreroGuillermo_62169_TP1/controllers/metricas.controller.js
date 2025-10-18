import { db } from "../config/DB.js";

export const getMetricasGenerales = (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM usuarios) AS total_usuarios,
      (SELECT COUNT(*) FROM proveedores) AS total_proveedores,
      (SELECT COUNT(*) FROM productos) AS total_productos,
      (SELECT SUM(stock) FROM productos) AS stock_total,
      (SELECT COUNT(*) FROM ventas) AS total_ventas,
      (SELECT SUM(total) FROM ventas) AS monto_total_ventas
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result[0]);
  });
};

export const getTopProductos = (req, res) => {
  const sql = `
    SELECT p.nombre, SUM(dv.cantidad) AS total_vendidos
    FROM detalle_ventas dv
    JOIN productos p ON dv.id_producto = p.id
    GROUP BY p.id
    ORDER BY total_vendidos DESC
    LIMIT 5;
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

export const getVentasPorMes = (req, res) => {
  const sql = `
    SELECT DATE_FORMAT(fecha, '%Y-%m') AS mes, COUNT(*) AS cantidad_ventas, SUM(total) AS total_mensual
    FROM ventas GROUP BY mes ORDER BY mes DESC;
  `;
  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};
