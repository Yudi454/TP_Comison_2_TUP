const { conexion } = require('../config/DB.js');

const detallesVentaController = {
    // GET Todos los detalles de una venta específica
    getDetallesByVenta: (req, res) => {
        const { venta_id } = req.params;
        conexion.query(`
            SELECT vd.*, p.nombre as producto_nombre 
            FROM ventas_detalle vd 
            JOIN productos p ON vd.producto_id = p.id 
            WHERE vd.venta_id = ?
        `, [venta_id], (err, results) => {
            if (err) return res.status(500).send('Error en servidor');
            res.json(results);
        });
    },

    // POST Crear nuevo detalle de venta
    createDetalleVenta: (req, res) => {
        const { venta_id, producto_id, cantidad, precio_unitario, subtotal } = req.body;
        
        conexion.query(
            'INSERT INTO ventas_detalle (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)', 
            [venta_id, producto_id, cantidad, precio_unitario, subtotal], 
            (err, results) => {
                if (err) return res.status(500).send('Error al crear detalle');
                res.json({ 
                    id: results.insertId, 
                    venta_id, 
                    producto_id, 
                    cantidad, 
                    precio_unitario, 
                    subtotal 
                });
            }
        );
    },

    // PUT Actualizar detalle de venta
    updateDetalleVenta: (req, res) => {
        const { id } = req.params;
        const { cantidad, precio_unitario, subtotal } = req.body;
        
        conexion.query(
            'UPDATE ventas_detalle SET cantidad = ?, precio_unitario = ?, subtotal = ? WHERE id = ?', 
            [cantidad, precio_unitario, subtotal, id], 
            (err, results) => {
                if (err) return res.status(500).send('Error al actualizar');
                res.send('Detalle actualizado correctamente');
            }
        );
    },

    // DELETE Eliminar detalle de venta
    deleteDetalleVenta: (req, res) => {
        const { id } = req.params;
        
        conexion.query('DELETE FROM ventas_detalle WHERE id = ?', [id], (err, results) => {
            if (err) return res.status(500).send('Error al eliminar');
            res.send('Detalle eliminado correctamente');
        });
    }
};

module.exports = detallesVentaController;