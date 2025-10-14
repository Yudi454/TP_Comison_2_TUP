const {connection} = require ("../config/db.js");

const proveedoresController = {
    // GET Todos los proveedores
    getAllProveedores: (req, res) => {
        connection.query('SELECT * FROM proveedores', (err, results) => {
            err ? res.status(500).send('Error en servidor') : res.json(results);
        });
    },

    // GET Proveedor por ID
    getProveedorById: (req, res) => {
        connection.query('SELECT * FROM proveedores WHERE id = ?', [req.params.id], (err, results) => {
            if (err) return res.status(500).send('Error en servidor');
            results.length === 0 ? res.status(404).send('No encontrado') : res.json(results[0]);
        });
    },

    // POST Crear proveedor
    createProveedor: (req, res) => {
        const { nombre, contacto, telefono, email, direccion } = req.body;
        connection.query('INSERT INTO proveedores (nombre, contacto, telefono, email, direccion) VALUES (?, ?, ?, ?, ?)', 
            [nombre, contacto, telefono, email, direccion], 
            (err, results) => {
                err ? res.status(500).send('Error al crear') : res.json({ id: results.insertId, nombre, contacto });
            });
    },

    // PUT Actualizar proveedor
    updateProveedor: (req, res) => {
        const { nombre, contacto, telefono, email, direccion } = req.body;
        connection.query('UPDATE proveedores SET nombre = ?, contacto = ?, telefono = ?, email = ?, direccion = ? WHERE id = ?', 
            [nombre, contacto, telefono, email, direccion, req.params.id], 
            (err, results) => {
                err ? res.status(500).send('Error al actualizar') : res.send('Actualizado correctamente');
            });
    },

    // DELETE Eliminar proveedor
    deleteProveedor: (req, res) => {
        connection.query('DELETE FROM proveedores WHERE id = ?', [req.params.id], (err, results) => {
            err ? res.status(500).send('Error al eliminar') : res.send('Eliminado correctamente');
        });
    }
};

module.exports = proveedoresController;