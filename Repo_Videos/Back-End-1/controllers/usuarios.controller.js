const {connection} = require('../config/config');


const mostrarTodosUsuarios = (req, res) => {

    const queryUsuario = "select * from Usuarios";

    connection.query(queryUsuario, (error, results)=>{
        if(error){
            console.error("Error al obtener los usuarios: ", error);
            res.status(500).json({message: "Error al obtener los usuarios"});
        }

        res.status(200).json(results);
    });

}

const mostrarUsuarioPorId = (req, res) => {
    const id = req.params.id;
    const queryUsuarioId = "select * from Usuarios where id = ?";

    connection.query(queryUsuarioId, [id], (error, results) => {
        if (error) {
            console.error("Error al obtener el usuario: ", error);
            res.status(500).json({ message: "Error al obtener el usuario" });
        }
        res.status(200).json(results);
    });
}
const crearUsuario = (req, res) => {
    const { nombre, password, rol} = req.body;

    const queryCrearUsuario = "INSERT INTO Usuarios (username,pass,rol) VALUES (?, ?, ?)";

    connection.query(queryCrearUsuario,[nombre, password, rol], (error, results) => {
        if (error) {
            console.error("Error al crear el usuario: ", error);
            res.status(500).json({ message: "Error al crear el usuario" });
        }
        res.status(201).json({ message: "Usuario creado exitosamente" });
    });
}

const actualizarUsuario = (req, res) => {
    const id = req.params.id;
    const { nombre, password, rol, activo } = req.body;

    const queryActualizarUsuario = "UPDATE Usuarios SET username = ?, pass = ?, rol = ?, activo = ? WHERE id = ?";
    connection.query(queryActualizarUsuario, [nombre, password, rol, activo, id], (error, results) => {
        if (error) {
            console.error("Error al actualizar el usuario: ", error);
            res.status(500).json({ message: "Error al actualizar el usuario" });
        }
        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    });
}

//eliminacion fisica
const eliminarUsuario = (req, res) => {
    const id = req.params.id;
    const queryEliminarUsuario = "DELETE FROM Usuarios WHERE id = ?";
    connection.query(queryEliminarUsuario, [id], (error, results) => {
        if (error) {
            console.error("Error al eliminar el usuario: ", error);
            res.status(500).json({ message: "Error al eliminar el usuario" });
        }
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    });
}

//eliminacion logica
const activarUsuario = (req, res) => {
    const id = req.params.id;
    const queryActivarUsuario = "UPDATE Usuarios SET activo = ? WHERE id = ?";
    connection.query(queryActivarUsuario, [0, id], (error, results) => {
        if (error) {
            console.error("Error al activar el usuario: ", error);
            res.status(500).json({ message: "Error al activar el usuario" });
        }
        res.status(200).json({ message: "Usuario activado exitosamente" });
    });
}


module.exports = {mostrarTodosUsuarios, mostrarUsuarioPorId,crearUsuario,actualizarUsuario,eliminarUsuario,activarUsuario}