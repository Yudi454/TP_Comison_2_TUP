const db= require('../config/DB');
const {enviarEmailRecuperacion} = require('../services/email.service');

const recuperarPassword = async (req, res) => {
    const {mail} = req.body;

    const consulta = 'SELECT * FROM alumnos WHERE email = ?';

    db.query(consulta, [mail], async (err, result) => {
        if (err) return res.status(500).json({message: 'Error en el servidor',err});
        if (result.length === 0) {
            return res.status(404).json({message: 'Usuario no encontrado'});
        }
        const usuario = result[0];

        const token = usuario.reset_token; // Suponiendo que el token ya está generado y almacenado en la base de datos
        const link = `http://localhost:3000/reset-password?token=${token}`;
        await enviarEmailRecuperacion(mail, link);

        res.status(200).json({message: 'Email de recuperación enviado'});

    })
}
module.exports = {
    recuperarPassword
};