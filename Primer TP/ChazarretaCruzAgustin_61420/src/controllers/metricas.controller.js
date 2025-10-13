import pool from "../config/db.js";

export const getMetricas = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT
            COUNT(v.id_venta) AS total_ventas,
            SUM(v.total) AS monto_total,
        FROM ventas v
        `);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};