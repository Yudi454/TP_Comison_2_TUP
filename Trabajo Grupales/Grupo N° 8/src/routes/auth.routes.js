const express = require('express');
const {recuperarPassword,cambioPasswordRecuperado} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/recuperar-password', recuperarPassword); //aca se envía el email con el link de recuperación
router.put('/cambio_password/:token', cambioPasswordRecuperado); //aca se cambia la contraseña usando el token

module.exports = router;