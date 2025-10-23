const {testMailController}= require('../controllers/mail.controller');
const express = require('express');
const router = express.Router();

router.post('/test-mail', testMailController); // ruta para enviar email de prueba

module.exports = router;