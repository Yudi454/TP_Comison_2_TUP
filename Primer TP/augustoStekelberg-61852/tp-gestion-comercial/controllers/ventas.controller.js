const pool = require('../config/db');

const ventasController = {
  listar: async (req, res) => {
    try {
      const [rows] = await pool.query(
        `SELECT v.id, v.fecha, c.nombre AS cliente, v.total
         FROM ventas v
         LEFT JOIN usuarios c ON v.usuario_id = c.id
         ORDER BY v.id DESC`
      );
      res.json(rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  crear: async (req, res) => {
    const { usuario_id, productos } = req.body;
    if (!usuario_id || !Array.isArray(productos) || productos.length === 0)
      return res.status(400).json({ error: 'Datos de venta inválidos' });

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      let total = 0;

      // Crear cabecera de venta
      const [venta] = await conn.query(
        'INSERT INTO ventas (usuario_id, fecha, total) VALUES (?, NOW(), 0)',
        [usuario_id]
      );

      const venta_id = venta.insertId;

      for (const p of productos) {
        const [rows] = await conn.query(
          'SELECT precio, stock FROM productos WHERE id=? FOR UPDATE',
          [p.id]
        );
        if (!rows.length) throw new Error(`Producto ${p.id} no existe`);
        if (rows[0].stock < p.cantidad)
          throw new Error(`Stock insuficiente para producto ${p.id}`);

        const subtotal = rows[0].precio * p.cantidad;
        total += subtotal;

        await conn.query(
          'INSERT INTO ventas_detalle (venta_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
          [venta_id, p.id, p.cantidad, rows[0].precio]
        );

        await conn.query('UPDATE productos SET stock = stock - ? WHERE id=?', [
          p.cantidad,
          p.id,
        ]);
      }

      await conn.query('UPDATE ventas SET total=? WHERE id=?', [total, venta_id]);
      await conn.commit();
      res.status(201).json({ id: venta_id, total });
    } catch (err) {
      await conn.rollback();
      res.status(500).json({ error: err.message });
    } finally {
      conn.release();
    }
  },
};

module.exports = ventasController;
