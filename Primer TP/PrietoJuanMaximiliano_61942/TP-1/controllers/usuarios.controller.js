const { connection } = require("../config/DB");

const obtenerUsuarioPorId = (req, res) => {
	const { id_usuario } = req.body;
	const query = "SELECT * FROM usuarios WHERE id_usuario = ?";
	connection.query(query, [id_usuario], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al obtener el usuario", details: err.message });
		}
		if (results.length === 0) {
			return res.status(404).json({ message: "Usuario no encontrado." });
		}
		res.json(results[0]);
	});
};

const crearUsuario = (req, res) => {
	const { nombre, email, contrasena } = req.body;
	const query = "INSERT INTO usuarios (nombre, email, contrasena, activo_usuario) VALUES (?, ?, ?, 1)";
	connection.query(query, [nombre, email, contrasena], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al crear el usuario", details: err.message });
		}
		res.status(201).json({ message: "Usuario creado con éxito", id_usuario: results.insertId });
	});
};

const actualizarUsuario = (req, res) => {
	const { id_usuario, nombre, email, contrasena, activo_usuario } = req.body;
	const query = "UPDATE usuarios SET nombre = ?, email = ?, contrasena = ?, activo_usuario = ? WHERE id_usuario = ?";
	connection.query(query, [nombre, email, contrasena, activo_usuario, id_usuario], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al actualizar el usuario", details: err.message });
		}
		if (results.affectedRows === 0) {
			return res.status(404).json({ message: "Usuario no encontrado." });
		}
		res.status(200).json({ message: "Usuario actualizado con éxito." });
	});
};

const eliminarUsuario = (req, res) => {
	const id = req.body.id_usuario;
	const query = "UPDATE usuarios SET activo_usuario = 0 WHERE id_usuario = ?";
	connection.query(query, [id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: "Error al eliminar el usuario", details: err.message });
		}
		if (results.affectedRows === 0) {
			return res.status(404).json({ message: "Usuario no encontrado." });
		}
		res.status(200).send({ message: "Usuario eliminado con éxito." });
	});
};

module.exports = { obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario };