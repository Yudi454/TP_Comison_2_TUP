const db = require("../config/DB");


const getTodosUsuarios = (req, res) => {
    const query = `
        SELECT u.id, u.nombre, u.apellido, u.email, u.telefono, u.rol_id, r.nombre_rol, u.fecha_creacion
        FROM usuarios u
        LEFT JOIN roles r ON u.rol_id = r.id
        ORDER BY u.fecha_creacion DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            return res.status(500).json({ error: "Error al obtener usuarios" });
        }
        res.json(results);
    });
};


const getUnUsuario = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT u.id, u.nombre, u.apellido, u.email, u.telefono, u.rol_id, r.nombre_rol, u.fecha_creacion
        FROM usuarios u
        LEFT JOIN roles r ON u.rol_id = r.id
        WHERE u.id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener usuario:", err);
            return res.status(500).json({ error: "Error al obtener usuario" });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(results[0]);
    });
};


const setUnUsuario = (req, res) => {
    const { nombre, apellido, email, telefono, rol_id } = req.body;
    const query = `
        INSERT INTO usuarios (nombre, apellido, email, telefono, rol_id)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(query, [nombre, apellido, email, telefono, rol_id], (err, results) => {
        if (err) {
            console.error("Error al insertar usuario:", err);
            return res.status(500).json({ error: "Error al insertar usuario" });
        }

        res.json({ message: "Usuario insertado correctamente", id: results.insertId });
    });
};


const updateUsuario = (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, rol_id } = req.body;

    const query = `
        UPDATE usuarios
        SET nombre = ?, apellido = ?, email = ?, telefono = ?, rol_id = ?
        WHERE id = ?
    `;

    db.query(query, [nombre, apellido, email, telefono, rol_id, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar usuario:", err);
            return res.status(500).json({ error: "Error al actualizar usuario" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario actualizado correctamente" });
    });
};


const deleteUsuario = (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM usuarios WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar usuario:", err);
            return res.status(500).json({ error: "Error al eliminar usuario" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json({ message: "Usuario eliminado correctamente" });
    });
};

module.exports = {
    getTodosUsuarios,
    getUnUsuario,
    setUnUsuario,
    updateUsuario,
    deleteUsuario
};
