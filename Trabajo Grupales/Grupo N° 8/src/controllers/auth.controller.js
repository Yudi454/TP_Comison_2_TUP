const db= require('../config/DB');
const jwt = require('jsonwebtoken');

const {enviarEmailRecuperacion} = require('../services/email.service');

// Controlador para iniciar el proceso de recuperación de contraseña
const recuperarPassword = async (req, res) => {
    const {mail} = req.body; //recuperamos el mail del body

    const consulta = 'SELECT * FROM usuarios WHERE email = ?'; // consulta para verificar si el usuario existe

    db.query(consulta, [mail], async (err, result) => {
        if (err) return res.status(500).json({message: 'Error en el servidor',err});
        if (result.length === 0) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        const usuario = result[0];

        const token = jwt.sign({id: usuario.id_usuario, email: usuario.email}, process.env.JWT_SECRET, {expiresIn: '15m'}) 
        // generamos un token JWT con el id y email del usuario, con expiración de 15 minutos

        const link = `http://localhost:3000/cambio_contraseña/${token}`; // link de recuperación de contraseña
        await enviarEmailRecuperacion(mail, link); // enviamos el email de recuperación

        res.status(200).json({message: 'Email de recuperación enviado'}); // respondemos que el email fue enviado

    })
}

// Controlador para cambiar la contraseña usando el token de recuperación
const cambioPasswordRecuperado = async (req, res) => {

    const {token} = req.params; // recuperamos el token de los parámetros de la URL
    const {newPassword} = req.body; // recuperamos la nueva contraseña del body

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verificamos y decodificamos el token

    const consulta = 'UPDATE usuarios SET contraseña = ? WHERE usuario_id = ?'; // consulta para actualizar la contraseña
    
    db.query(consulta, [newPassword, decoded.id], (err, result) => {
        if (err) return res.status(500).json({message: 'Error en el servidor', err});

        if(result.length===0) return res.status(404).json({message: 'Usuario no encontrado'});

        res.status(200).json({message: 'Contraseña actualizada correctamente'});
    });
}

module.exports = {
    recuperarPassword,
    cambioPasswordRecuperado
};