const { connection } = require("../config/DB");


const registrarVenta = (req, res) => {
	const { total, empleado_id, productos } = req.body;

	const ventaQuery = "INSERT INTO ventas (total, empleado_id) VALUES (?, ?)";
	connection.query(ventaQuery, [total, empleado_id], (err, ventaResult) => {
		if (err) {
			return res.status(500).json({ error: "Error al registrar la venta", details: err.message });
		}
		const venta_id = ventaResult.insertId;

		
		const detalles = productos.map(p => [venta_id, p.producto_id, p.cantidad, p.precio_unitario]);
		const detallesQuery = "INSERT INTO detalles_ventas (venta_id, producto_id, cantidad, precio_unitario) VALUES ?";
		connection.query(detallesQuery, [detalles], (err, detallesResult) => {
			if (err) {
				return res.status(500).json({ error: "Error al registrar los productos de la venta", details: err.message });
			}
			res.status(201).json({ message: "Venta registrada con éxito", venta_id });
		});
	});
};

module.exports = { registrarVenta };
