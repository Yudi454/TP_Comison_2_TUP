const pool = require('../config/db');

const metricasController = {
  resumen: async (req, res) => {
    try {
      const [[productos]] = await pool.query(
        'SELECT COUNT(*) AS total_productos FROM productos'
      );
      const [[ventas]] = await pool.query(
        'SELECT COUNT(*) AS total_ventas, SUM(total) AS monto_total FROM ventas'
      );
      const [[usuarios]] = await pool.query(
        'SELECT COUNT(*) AS total_usuarios FROM usuarios'
      );

      res.json({
        productos,
        ventas,
        usuarios,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = metricasController;
