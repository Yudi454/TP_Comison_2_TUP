// Importamos express
const express = require('express');
const router = express.Router();

// Importamos el controlador de usuarios
const usuariosController = require('../controllers/usuarios.controller');

// Ruta GET: devuelve todos los usuarios
router.get('/', usuariosController.getUsuarios);

// Ruta POST: crea un nuevo usuario
router.post('/', usuariosController.createUsuario);

// Exportamos el router
module.exports = router;









