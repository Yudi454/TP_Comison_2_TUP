const { connection } = require('../config/db.js');



const metricasController = {
    // GET Ventas totales
    getVentasTotales: (req, res) => {
        connection.query('SELECT SUM(total) as total_ventas, COUNT(*) as total_transacciones FROM ventas WHERE estado = "completada"', 
            (err, results) => {
                err ? res.status(500).send('Error en servidor') : res.json(results[0]);
            });
    },

    // GET Productos más vendidos
    getProductosMasVendidos: (req, res) => {
        connection.query(`
            SELECT p.nombre, SUM(vd.cantidad) as total_vendido 
            FROM ventas_detalle vd 
            JOIN productos p ON vd.producto_id = p.id 
            GROUP BY p.id 
            ORDER BY total_vendido DESC 
            LIMIT 10
        `, (err, results) => {
            err ? res.status(500).send('Error en servidor') : res.json(results);
        });
    },

    // GET Stock bajo
    getStockBajo: (req, res) => {
        connection.query('SELECT nombre, stock, stock_minimo FROM productos WHERE stock <= stock_minimo', 
            (err, results) => {
                err ? res.status(500).send('Error en servidor') : res.json(results);
            });
    }
};

module.exports = metricasController;