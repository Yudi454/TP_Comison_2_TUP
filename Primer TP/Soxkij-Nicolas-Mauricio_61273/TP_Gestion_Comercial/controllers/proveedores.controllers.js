const db = require("../config/DB");


const getTodosProveedores = (req, res) => {
    const query = `SELECT * FROM proveedores ORDER BY fecha_creacion DESC`;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener proveedores:", err);
            return res.status(500).json({ error: "Error al obtener proveedores" });
        }
        res.json(results);
    });
};


const getUnProveedor = (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM proveedores WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener proveedor:", err);
            return res.status(500).json({ error: "Error al obtener proveedor" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.json(results[0]);
    });
};


const setUnProveedor = (req, res) => {
    const { nombre, cuit, telefono, email, direccion } = req.body;
    const query = `
        INSERT INTO proveedores (nombre, cuit, telefono, email, direccion)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, cuit, telefono, email, direccion], (err, results) => {
        if (err) {
            console.error("Error al insertar proveedor:", err);
            return res.status(500).json({ error: "Error al insertar proveedor" });
        }

        res.json({ message: "Proveedor insertado correctamente", id: results.insertId });
    });
};


const updateProveedor = (req, res) => {
    const { id } = req.params;
    const { nombre, cuit, telefono, email, direccion } = req.body;

    const query = `
        UPDATE proveedores
        SET nombre = ?, cuit = ?, telefono = ?, email = ?, direccion = ?
        WHERE id = ?
    `;

    db.query(query, [nombre, cuit, telefono, email, direccion, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar proveedor:", err);
            return res.status(500).json({ error: "Error al actualizar proveedor" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.json({ message: "Proveedor actualizado correctamente" });
    });
};


const deleteProveedor = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM proveedores WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar proveedor:", err);
            return res.status(500).json({ error: "Error al eliminar proveedor" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }

        res.json({ message: "Proveedor eliminado correctamente" });
    });
};

module.exports = { 
    getTodosProveedores, 
    getUnProveedor, 
    setUnProveedor, 
    updateProveedor, 
    deleteProveedor 
};
