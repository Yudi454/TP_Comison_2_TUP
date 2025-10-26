const {connection} = require('../config/config');
const jwt = require('jsonwebtoken');
const {comparePassword} = require('../utils/hash.utils');

const loginUsuario = (req, res) => {

const {nombre, password} = req.body; // traigo los datos del body

const query = "select * from Usuarios where username = ? and pass = ? and activo = ?"; // consulta para verificar el usuario



connection.query(query, [nombre, password,1], (error, results)=>{
    if(error){
        console.error("Error al iniciar sesion: ", error);
        return res.status(500).json({message: "Error al iniciar sesion"});
    }

    // estoy verificando si el usuario existe
    if(results.length > 0){
        const usuario = results[0]; // estoy guardando el resultado de la consulta en una variable

        const isValid = comparePassword(password, usuario.pass);
        
        if(nombre === usuario.username && isValid){
            // Crear el token JWT
            const token = jwt.sign(
                {id: usuario.id_usuario, username: usuario.username, rol: usuario.Rol}, // payload
                process.env.JWT_SECRET, //clave secreta del token 
                {expiresIn: process.env.JWT_EXPIRES_IN} // opciones del token
            );
            return res.json({message: "Inicio de sesion exitoso", token: token});
        }else {
            return res.status(401).json({message: "Credenciales invalidas"});
        }
    } else{
        return res.status(401).json({message: "Credenciales invalidas"});
    }
})

};

module.exports = {loginUsuario};