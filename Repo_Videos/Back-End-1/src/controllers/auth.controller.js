const jwt = require('jsonwebtoken');
const {enviarRecuperacionPassword} = require('../service/email.service');
const {connection} = require('../config/config');
const dotenv = require('dotenv');
dotenv.config();

const solicitarReset = (req,res)=>{
    const {email} = req.body;
    const query = 'SELECT * FROM Usuarios WHERE mail = ?';
connection.query(query, [email], async (error, results) => {
    if(error){
        return res.status(500).json({message: "Error en el servidor"});
    }

    if(results.length === 0){
        return res.status(404).json({message: "Usuario no encontrado"});
    }

    const user = results[0];
    const token = jwt.sign({id: user.id_usuario, mail: user.mail}, process.env.JWT_SECRET, {expiresIn: '15m'});
    const link = `http://localhost:3000/api/auth/reset-password?token=${token}`;
    await enviarRecuperacionPassword(user.mail, link);
    return res.status(200).json({message: "Email de recuperación enviado"});
});
}

const resetPassword = (req,res)=>{}

module.exports = { solicitarReset, resetPassword };