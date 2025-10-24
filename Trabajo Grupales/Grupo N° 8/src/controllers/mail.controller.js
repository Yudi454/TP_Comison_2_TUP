const {enviarEmail} = require('../services/email.service');

// Controlador de prueba para enviar un email
const testMailController = async (req, res) => {
    const {mail} = req.body; // recuperamos el mail del body

    await enviarEmail(mail); // enviamos el email de prueba

    res.status(200).json({message: 'Email enviado correctamente'});
}

module.exports = {
    testMailController
};