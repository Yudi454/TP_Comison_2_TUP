const {enviarEmail} = require('../services/email.service');

const testMailController = async (req, res) => {
    const {mail} = req.body;

    await enviarEmail(mail);

    res.status(200).json({message: 'Email enviado correctamente'});
}

module.exports = {
    testMailController
};