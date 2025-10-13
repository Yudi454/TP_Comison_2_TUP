import pool from "../config/db.js";

export const getStock = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT s.id_stock, p.nombre AS producto, s.id_producto, s.cantidad
        FROM stock s
        INNER JOIN productos p ON s.id_producto = p.id_producto
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createStock = async (req, res) => {
    try {
        const { id_producto, cantidad } = req.body;
        const [result] = await pool.query(
        "INSERT INTO stock (id_producto, cantidad) VALUES (?, ?)",
        [id_producto, cantidad || 0]
        );
        res.status(201).json({id: result.insertId, id_producto, cantidad: cantidad || 0});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        const [result] = await pool.query(
        "UPDATE stock SET cantidad = ? WHERE id_stock = ?",
        [cantidad, id]
        );
        if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro de stock no encontrado" });
        res.json({ message: "Stock actualizado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteStock = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(
        "DELETE FROM stock WHERE id_stock = ?",
        [id]
        );
        if (result.affectedRows === 0)
        return res.status(404).json({ message: "Registro de stock no encontrado" });
        res.json({ message: "Registro de stock eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};