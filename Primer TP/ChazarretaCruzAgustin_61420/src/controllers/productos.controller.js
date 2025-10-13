import pool from "../config/db.js";

export const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT p.id_producto, p.nombre, p.descripcion, p.precio, 
            pr.nombre AS proveedor, p.id_proveedor
        FROM productos p
        LEFT JOIN proveedores pr ON p.id_proveedor = pr.id_proveedor
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, id_proveedor } = req.body;
        const [result] = await pool.query(
            "INSERT INTO productos (nombre, descripcion, precio, id_proveedor) VALUES (?, ?, ?, ?)",
        [nombre, descripcion, precio, id_proveedor]
        );
        res.status(201).json({id: result.insertId, nombre, descripcion, precio, id_proveedor});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, id_proveedor } = req.body;
        const [result] = await pool.query(
            "UPDATE productos SET nombre=?, descripcion=?, precio=?, id_proveedor=? WHERE id_producto=?",
        [nombre, descripcion, precio, id_proveedor, id]
        );
        if (result.affectedRows === 0)
        return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(
            "DELETE FROM productos WHERE id_producto=?",
        [id]
        );
        if (result.affectedRows === 0)
        return res.status(404).json({ message: "Producto no encontrado" });
        res.json({ message: "Producto eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};