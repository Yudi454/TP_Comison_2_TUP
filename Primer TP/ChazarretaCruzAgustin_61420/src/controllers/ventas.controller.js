import pool from "../config/db.js";

export const getVentas = async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT v.id_venta, v.fecha, u.nombre AS usuario, v.total
        FROM ventas v
        INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
        ORDER BY v.fecha DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const createVenta = async (req, res) => {
    const { id_usuario, productos } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        // Calcular total
        let total = 0;
        for (const item of productos) {
        const [prod] = await connection.query(
            "SELECT precio FROM productos WHERE id_producto=?",
            [item.id_producto]
        );
        if (prod.length === 0)
            throw new Error(`Producto con ID ${item.id_producto} no encontrado`);
        total += prod[0].precio * item.cantidad;
        }

        // Insertar venta
        const [ventaResult] = await connection.query(
        "INSERT INTO ventas (id_usuario, total) VALUES (?, ?)",
        [id_usuario, total]
        );

        const id_venta = ventaResult.insertId;

        // Insertar detalle
        for (const item of productos) {
        const [prod] = await connection.query(
            "SELECT precio FROM productos WHERE id_producto=?",
            [item.id_producto]
        );
        const subtotal = prod[0].precio * item.cantidad;

        await connection.query(
            "INSERT INTO detalle_venta (id_venta, id_producto, cantidad, subtotal) VALUES (?, ?, ?, ?)",
            [id_venta, item.id_producto, item.cantidad, subtotal]
        );

        // Actualizar stock
        await connection.query(
            "UPDATE stock SET cantidad = cantidad - ? WHERE id_producto=?",
            [item.cantidad, item.id_producto]
        );
        }

        await connection.commit();

        res.status(201).json({
        message: "Venta registrada correctamente",
        id_venta,
        total,
        });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};

export const getVentaDetalle = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
        `
        SELECT vd.id_detalle, p.nombre AS producto, vd.cantidad, vd.subtotal
        FROM detalle_venta dv
        INNER JOIN productos p ON vd.id_producto = p.id_producto
        WHERE vd.id_venta = ?
        `,
        [id]
        );
        if (rows.length === 0)
        return res.status(404).json({ message: "No se encontró el detalle de esta venta" });
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteVenta = async (req, res) => {
    const { id } = req.params;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        await connection.query("DELETE FROM detalle_venta WHERE id_venta=?", [id]);
        const [result] = await connection.query("DELETE FROM ventas WHERE id_venta=?", [id]);
        if (result.affectedRows === 0)
        throw new Error("Venta no encontrada");
        await connection.commit();
        res.json({ message: "Venta eliminada correctamente" });
    } catch (err) {
        await connection.rollback();
        res.status(500).json({ error: err.message });
    } finally {
        connection.release();
    }
};