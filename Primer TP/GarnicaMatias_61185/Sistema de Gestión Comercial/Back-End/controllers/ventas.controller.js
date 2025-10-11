


const ventasController = {
    // GET Todas las ventas
    getAllVentas: (req, res) => {
        connection.query('SELECT v.*, u.nombre as usuario_nombre FROM ventas v JOIN usuarios u ON v.usuario_id = u.id', 
            (err, results) => {
                err ? res.status(500).send('Error en servidor') : res.json(results);
            });
    },

    // GET Venta por ID
    getVentaById: (req, res) => {
        connection.query('SELECT v.*, u.nombre as usuario_nombre FROM ventas v JOIN usuarios u ON v.usuario_id = u.id WHERE v.id = ?', 
            [req.params.id], 
            (err, results) => {
                if (err) return res.status(500).send('Error en servidor');
                results.length === 0 ? res.status(404).send('No encontrado') : res.json(results[0]);
            });
    },

    // POST Crear venta
    createVenta: (req, res) => {
        const { usuario_id, total, estado } = req.body;
        connection.query('INSERT INTO ventas (usuario_id, total, estado) VALUES (?, ?, ?)', 
            [usuario_id, total, estado], 
            (err, results) => {
                err ? res.status(500).send('Error al crear') : res.json({ id: results.insertId, usuario_id, total });
            });
    },

    // PUT Actualizar venta
    updateVenta: (req, res) => {
        const { usuario_id, total, estado } = req.body;
        connection.query('UPDATE ventas SET usuario_id = ?, total = ?, estado = ? WHERE id = ?', 
            [usuario_id, total, estado, req.params.id], 
            (err, results) => {
                err ? res.status(500).send('Error al actualizar') : res.send('Actualizado correctamente');
            });
    },

    // DELETE Eliminar venta
    deleteVenta: (req, res) => {
        connection.query('DELETE FROM ventas WHERE id = ?', [req.params.id], (err, results) => {
            err ? res.status(500).send('Error al eliminar') : res.send('Eliminado correctamente');
        });
    }
};

module.exports = ventasController;