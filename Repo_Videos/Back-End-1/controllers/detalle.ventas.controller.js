const {connection} = require('../database/db');
const mostrarTodosVentas = (req, res) => {


    const queryDetalleVentas = `SELECT * FROM detalle_ventas dv
    JOIN ventas v ON dv.id_venta = v.id_venta
    JOIN productos p ON dv.id_producto = p.id_producto
    WHERE v.activo = 1`;

    connection.query(queryDetalleVentas, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener detalles de ventas" });
        }
        res.json(results);
    });
};

const mostrarVentasInactivas = (req, res) => {
    const queryDetalleVentas = "SELECT * FROM detalle_ventas dv
    JOIN ventas v ON dv.id_venta = v.id_venta
    JOIN productos p ON dv.id_producto = p.id_producto
    WHERE v.activo = 0";

    connection.query(queryDetalleVentas, (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener detalles de ventas inactivas" });
        }
        res.json(results);
    });
};

const mostrarVentasPorId = (req, res) => {
    const { id } = req.params;
    const queryDetalleVentas = "SELECT * FROM detalle_ventas dv
    JOIN ventas v ON dv.id_venta = v.id_venta
    JOIN productos p ON dv.id_producto = p.id_producto
    WHERE v.activo = 1 AND dv.id_detalle = ?";

    connection.query(queryDetalleVentas, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: "Error al obtener detalle de venta" });
        }
        res.json(results);
    });
};

module.exports = { mostrarTodosVentas, mostrarVentasInactivas, mostrarVentasPorId };