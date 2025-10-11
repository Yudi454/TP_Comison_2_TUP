const {connection} = require ('../config/db.js');


const usuariosController = {
    // GET Todos los usuarios
    getAllUsuarios: (req, res) => {
        connection.query
        ('SELECT * FROM usuarios',
             (err, results) => {
            err ? res.status(500).send('Error en servidor') : res.json(results);
        });
    },

    // GET Usuario por ID
    getUsuarioById: (req, res) => {
        connection.query
        ('SELECT * FROM usuarios WHERE id = ?', [req.params.id],
             (err, results) => {
            if (err) return res.status(500).send('Error en servidor');
            results.length === 0 ? res.status(404).send('No encontrado') : res.json(results[0]);
        });
    },

    // POST Crear usuario
    createUsuario: (req, res) => {
        const { nombre, email, telefono, rol, activo } = req.body;
        connection.query('INSERT INTO usuarios (nombre, email, telefono, rol, activo ) VALUES (?, ?)', [nombre, email], (err, results) => {
            err ? res.status(500).send('Error al crear') : res.json({ id: results.insertId, nombre, email });
        });
    },

    // PUT Actualizar usuario
    updateUsuario: (req, res) => {
        const { nombre, email, telefono, rol, activo  } = req.body;
        connection.query('UPDATE usuarios SET nombre = ?, email = , telefono = ?, rol = ?, activo = ?,  WHERE id = ?', [nombre, email, telefono, rol, activo, req.params.id], (err, results) => {
            err ? res.status(500).send('Error al actualizar') : res.send('Actualizado correctamente');
        });
    },

    // DELETE Eliminar usuario
    deleteUsuario: (req, res) => {
        connection.query('DELETE FROM usuarios WHERE id = ?', [req.params.id], (err, results) => {
            err ? res.status(500).send('Error al eliminar') : res.send('Eliminado correctamente');
        });
    }
};

module.exports = usuariosController;