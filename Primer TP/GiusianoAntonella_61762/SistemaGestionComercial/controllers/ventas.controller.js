// controllers/ventas.controller.js
const { pool } = require('../config/DB');

/**
 * Obtiene el listado de todas las ventas (solo la cabecera).
 */
exports.obtenerTodas = async (req, res) => {
    try {
        // Obtengo la cabecera y el nombre del vendedor
        const sql = `
            SELECT 
                v.id_venta, 
                v.fecha_venta, 
                v.total_venta, 
                CONCAT(u.nombre, ' ', u.apellido) AS vendedor,
                COALESCE(CONCAT(c.nombre, ' ', c.apellido), 'Consumidor Final') AS cliente
            FROM 
                ventas v
            JOIN 
                usuarios u ON v.id_usuario = u.id_usuario
            LEFT JOIN
                clientes c ON v.id_cliente = c.id_cliente
            ORDER BY 
                v.fecha_venta DESC;
        `;
        const [rows] = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener listado de ventas:", error);
        res.status(500).json({ message: 'Error interno del servidor al obtener ventas.' });
    }
};

/**
 * Obtiene el detalle completo de una venta específica (cabecera + líneas).
 */
exports.obtenerDetalle = async (req, res) => {
    const { id } = req.params;
    try {
        const sql = `
            SELECT 
                v.id_venta, 
                v.fecha_venta, 
                v.total_venta,
                u.nombre AS vendedor_nombre,
                p.nombre AS producto_nombre,
                dv.cantidad,
                dv.precio_unitario
            FROM 
                ventas v
            JOIN 
                detalle_venta dv ON v.id_venta = dv.id_venta
            JOIN
                productos p ON dv.id_producto = p.id_producto
            JOIN
                usuarios u ON v.id_usuario = u.id_usuario
            WHERE 
                v.id_venta = ?;
        `;
        const [rows] = await pool.query(sql, [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Venta o detalle no encontrado.' });
        }
        res.json(rows);

    } catch (error) {
        console.error("Error al obtener detalle de venta:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

/**
 * CREAR VENTA 
 * Asegurar que se inserten la cabecera, el detalle y se actualice el stock, o que todo falle.
 */
exports.crearVenta = async (req, res) => {
    const { id_usuario, id_cliente, productos } = req.body; 
    
    // Validaciones mínimas
    if (!id_usuario || !productos || productos.length === 0) {
        return res.status(400).json({ message: 'El ID de usuario y los productos son obligatorios.' });
    }

    let connection; 
    let total_venta = 0;

    try {
        // inci transaccion ---
        connection = await pool.getConnection();
        await connection.beginTransaction();

        // calculo total
        for (const item of productos) {
            total_venta += item.cantidad * item.precio_unitario;
        }

        // inserta cabecera de vta
        const ventaSql = 'INSERT INTO ventas (id_usuario, id_cliente, total_venta) VALUES (?, ?, ?)';
        const [ventaResult] = await connection.query(ventaSql, [id_usuario, id_cliente || null, total_venta]);
        const id_venta = ventaResult.insertId;

        // -inserta detalles y actualiza stock
        for (const item of productos) {
            // Insertar Detalle
            const detalleSql = 'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
            await connection.query(detalleSql, [id_venta, item.id_producto, item.cantidad, item.precio_unitario]);

            // Actualiza Stock y valida que haya suficiente
            //  en el WHERE garantiza que si el stock es insuficiente no se ejecute el update.
            const stockSql = 'UPDATE productos SET stock = stock - ? WHERE id_producto = ? AND stock >= ?';
            const [stockResult] = await connection.query(stockSql, [item.cantidad, item.id_producto, item.cantidad]);

            // Si affectedRows es 0 no se puede actualizar el stock 
            if (stockResult.affectedRows === 0) {
                // Forzamos el error para que se active el bloque catch y se haga el rolback
                throw new Error(`Stock insuficiente para el producto ID: ${item.id_producto}.`);
            }
        }

        // confirma transaccion
        await connection.commit();
        connection.release(); // Liberar la conexión al pool

        res.status(201).json({ 
            message: 'Venta realizada con éxito y stock actualizado', 
            id_venta 
        });

    } catch (error) {
        // rollback si fala
        if (connection) {
            await connection.rollback(); // Deshace todos los cambios sql
            connection.release();
        }
        
        console.error("Error en la transacción de venta:", error.message);
        
        // Retorna un mensaje de error más específico al cliente
        res.status(500).json({ 
            message: 'Error al procesar la venta. La transacción ha sido deshecha.',
            detail: error.message
        });
    }
};