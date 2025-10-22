const nodemailer = require('nodemailer'); // importamos nodemailer
const dotenv = require('dotenv'); // importamos dotenv para leer variables de entorno
dotenv.config(); // cargamos las variables de entorno desde el archivo .env

// configuramos el transporter de nodemailer con los datos del archivo .env

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    secure: false, // sierve para q no falle con port 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});


const enviarEmail = async (to) => {
    return transporter.sendMail({
        from: `"Biblioteca App" <${process.env.SMTP_USER}>`, // remitente
        to: to, // destinatario
        subject: 'Bienvenido a la Biblioteca', // asunto del email
        text: 'Gracias por registrarte en nuestra biblioteca. ¡Disfruta de la lectura!', // cuerpo del email en texto plano
        html: '<b>Gracias por registrarte en nuestra biblioteca. ¡Disfruta de la lectura!</b>' // cuerpo del email en HTML
    });
}

module.exports = {
    enviarEmail
};