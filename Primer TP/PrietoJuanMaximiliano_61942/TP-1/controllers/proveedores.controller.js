const { connection } = require("../config/DB");

const obtenerTodosProveedores = (req, res) => {
	const query = "SELECT * FROM proveedores";
	connection.query(query, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
};

const crearProveedor = (req, res) => {
	const { nombre } = req.body;
	const query = "INSERT INTO proveedores (nombre, activo_proveedor) VALUES (?, 1)";
	connection.query(query, [nombre], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al crear el proveedor", details: err.message });
		}
		res.status(201).json({ message: "Proveedor creado con éxito", id_proveedor: results.insertId });
	});
};

const actualizarProveedor = (req, res) => {
	const { id_proveedor, nombre, activo_proveedor } = req.body;
	const query = "UPDATE proveedores SET nombre = ?, activo_proveedor = ? WHERE id_proveedor = ?";
	connection.query(query, [nombre, activo_proveedor, id_proveedor], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al actualizar el proveedor", details: err.message });
		}
		if (results.affectedRows === 0) {
			return res.status(404).json({ message: "Proveedor no encontrado." });
		}
		res.status(200).json({ message: "Proveedor actualizado con éxito." });
	});
};

const eliminarProveedor = (req, res) => {
	const id = req.body.id_proveedor;
	const query = "UPDATE proveedores SET activo_proveedor = 0 WHERE id_proveedor = ?";
	connection.query(query, [id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al eliminar el proveedor", details: err.message });
		}
		if (results.affectedRows === 0) {
			return res.status(404).json({ message: "Proveedor no encontrado." });
		}
		res.status(200).send({ message: "Proveedor eliminado con éxito." });
	});
};

module.exports = { obtenerTodosProveedores, crearProveedor, actualizarProveedor, eliminarProveedor };
