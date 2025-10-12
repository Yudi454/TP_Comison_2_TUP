import db from "../config/DB.js";

//Traer todos los usuarios

export const traerUsuarios = async (req, res) => {
    try {
        const traerTodosLosUsuarios = 'SELECT * FROM usuarios';
        db.query(traerTodosLosUsuarios, (error, results) => {
            if (error) {
                console.error("Error al traer los usuarios: ", error);
                res.status(500).json({ message: "Error del sarvidor al traer los usuarios" });
            }
            res.status(200).json(results);
        })

    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
};

// filtro para traer usuarios activos
export const traerActivos = async (req, res) => {
    try {
        const activos = 'SELECT * FROM usuarios WHERE isActive = 1';
        db.query(activos, (error, results) => {
            if (error) {
                console.error("Error al traer los usuarios activos: ", error);
                res.status(500).json({ message: "Error del sarvidor al traer los usuarios activos" });
            }
            res.status(200).json(results);
        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });
    }
}

// creacion de usuarios

export const crearUsuario = async (req, res) => {
    try {

        //traer los datos del body
        const {
            nombreUsuario,
            apellidoUsuario,
            direccionUsuario,
            telefonoUsuario,
            emailUsuario,
            contrasenaUsuario,
        } = req.body;

        const nuevoUsuario = "INSERT INTO usuarios (nombreUsuario, apellidoUsuario, direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario) VALUES (?, ?, ?, ?, ?, ?)";

        db.query(nuevoUsuario, [nombreUsuario, apellidoUsuario, direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario], (error, results) => {
            if (error) {
                console.error("Error al crear el usuario: ", error);
                res.status(500).json({ message: "Error del sarvidor al crear el usuario" });
            }
            res.status(201).json({ message: "Usuario creado con exito" });
            idInsertado: results.insertId
        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });

    }
};

//Actualizar usuario

export const actualizarUsuario = async (req, res) => {
    try {

        const { idUsuario } = req.params;
        //traer los datos del body
        const {
            nombreUsuario,
            apellidoUsuario,
            direccionUsuario,
            telefonoUsuario,
            emailUsuario,
            contrasenaUsuario,
        } = req.body;

        const actualizar = "UPDATE usuarios SET nombreUsuario = ?, apellidoUsuario = ?, direccionUsuario = ?, telefonoUsuario = ?, emailUsuario = ?, contrasenaUsuario = ? WHERE idUsuario = ?";

        db.query(actualizar, [nombreUsuario, apellidoUsuario, direccionUsuario, telefonoUsuario, emailUsuario, contrasenaUsuario, idUsuario], (error, results) => {
            if (error) {
                console.error("Error al actualizar el usuario: ", error);
                res.status(500).json({ message: "Error del sarvidor al actualizar el usuario" });
            }
            res.status(201).json({ message: "Usuario actualizado con exito" });

        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });

    }
};

//Borrado logico de usuarios para no afectar las realciones entre tablas

export const borradoLogicoUsuario = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        const borradoLogico = "UPDATE usuarios SET isActive = 0 WHERE idUsuario = ?";
        db.query(borradoLogico, [idUsuario], (error, results) => {
            if (error) {
                console.error("Error al eliminar el usuario: ", error);
                res.status(500).json({ message: "Error del sarvidor al eliminar el usuario" });
            }
            res.status(201).json({ message: "Usuario eliminado con exito" });

        })
    } catch (error) {
        res.status(500).json({ message: "Error del servidor" });

    }
}
