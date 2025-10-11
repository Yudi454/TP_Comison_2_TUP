const {connection} =  require("../config/db");


const productosController = {
    // GET Todos los productos
    getAllProductos: (req, res) => {
        connection.query('SELECT p.*, pr.nombre as proveedor_nombre FROM productos p LEFT JOIN proveedores pr ON p.proveedor_id = pr.id', 
            (err, results) => {
                err ? res.status(500).send('Error en servidor') : res.json(results);
            });
    },

    // GET Producto por ID
    getProductoById: (req, res) => {
        connection.query('SELECT p.*, pr.nombre as proveedor_nombre FROM productos p LEFT JOIN proveedores pr ON p.proveedor_id = pr.id WHERE p.id = ?', 
            [req.params.id], 
            (err, results) => {
                if (err) return res.status(500).send('Error en servidor');
                results.length === 0 ? res.status(404).send('No encontrado') : res.json(results[0]);
            });
    },

    // POST Crear producto
    createProducto: (req, res) => {
        const { nombre, descripcion, precio, costo, stock, stock_minimo, proveedor_id } = req.body;
        connection.query('INSERT INTO productos (nombre, descripcion, precio, costo, stock, stock_minimo, proveedor_id) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [nombre, descripcion, precio, costo, stock, stock_minimo, proveedor_id], 
            (err, results) => {
                err ? res.status(500).send('Error al crear') : res.json({ id: results.insertId, nombre, precio });
            });
    },

    // PUT Actualizar producto
    updateProducto: (req, res) => {
        const { nombre, descripcion, precio, costo, stock, stock_minimo, proveedor_id } = req.body;
        connection.query('UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, costo = ?, stock = ?, stock_minimo = ?, proveedor_id = ? WHERE id = ?', 
            [nombre, descripcion, precio, costo, stock, stock_minimo, proveedor_id, req.params.id], 
            (err, results) => {
                err ? res.status(500).send('Error al actualizar') : res.send('Actualizado correctamente');
            });
    },

    // DELETE Eliminar producto
    deleteProducto: (req, res) => {
        connection.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err, results) => {
            err ? res.status(500).send('Error al eliminar') : res.send('Eliminado correctamente');
        });
    }
};

module.exports = productosController;