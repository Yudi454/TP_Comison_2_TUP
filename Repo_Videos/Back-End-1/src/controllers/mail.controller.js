const {enviarMailTest} = require('../service/email.service');

const testMailController = async (req,res) =>{

    const {mail} = req.body;

    await enviarMailTest(mail);

    res.status(200).json({message: "Email de prueba enviado exitosamente"});
}

module.exports = { testMailController };