const pool = require('../config/DB');

// Total de ventas por usuario
const ventasPorUsuario = (req, res) => {
    const sql = `
        SELECT u.nombre AS usuario, SUM(v.cantidad) AS total_ventas
        FROM ventas v
        JOIN usuarios u ON v.usuario_id = u.id
        GROUP BY u.id
    `;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Productos más vendidos
const productosMasVendidos = (req, res) => {
    const sql = `
        SELECT p.nombre AS producto, SUM(v.cantidad) AS total_vendido
        FROM ventas v
        JOIN productos p ON v.producto_id = p.id
        GROUP BY p.id
        ORDER BY total_vendido DESC
        LIMIT 5
    `;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Stock restante por producto
const stockRestante = (req, res) => {
    const sql = `
        SELECT nombre AS producto, stock
        FROM productos
    `;
    pool.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

module.exports = {
    ventasPorUsuario,
    productosMasVendidos,
    stockRestante
};
