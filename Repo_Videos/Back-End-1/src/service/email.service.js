const nodemailer = require('nodemailer');// libreria para enviar emails
const dotenv = require('dotenv');// para leer variables de entorno
dotenv.config(); // inicializar dotenv

    // configuracion del transporter de nodemailer

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587 || 465,
    secure: false, // esto sirve para que no falle con port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

// const enviarMailTest = async (to) =>{
//     return transporter.sendMail({
//         from: `"Servidor de pruebas" <${process.env.SMTP_USER}>`, // sender address
//         to: to, // esto es el destinatario
//         subject: "Email de prueba desde Node.js", // esto es el asunto
//         text: "Hola! Este es un email de prueba enviado desde Node.js usando Nodemailer.", // el cuerpo del email en texto plano
//         html: "<b>Hola! Este es un email de prueba enviado desde Node.js usando Nodemailer.</b>" // el cuerpo del email en HTML
//     });
// }

const enviarRecuperacionPassword = async (email, link) =>{
    const htmlTemplate =`
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #333;">Recuperación de Contraseña</h2>
        <p>Hola,</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el siguiente enlace para proceder:</p>
        <a href="${link}" style="display: inline-block; padding: 10px 15px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Restablecer Contraseña</a>
        <p>Si no solicitaste este cambio, puedes ignorar este correo electrónico.</p>
        <p>Saludos,<br/>El equipo de Soporte</p>
    </div>
    `;


return transporter.sendMail({
    from: `"Soporte" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Recuperación de Contraseña",
    html: htmlTemplate
});
}

module.exports = { enviarRecuperacionPassword };