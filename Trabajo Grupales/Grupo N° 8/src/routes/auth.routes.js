const express = require('express');
const {recuperarPassword,cambioPasswordRecuperado} = require('../controllers/auth.controller');
const router = express.Router();

//aca se envía el email con el link de recuperación
router.post('/recuperar-password', recuperarPassword);

//aca se cambia la contraseña usando el token
router.put('/cambio_password/:token', cambioPasswordRecuperado); 

module.exports = router;