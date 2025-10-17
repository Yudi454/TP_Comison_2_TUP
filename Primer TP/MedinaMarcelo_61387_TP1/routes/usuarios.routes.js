const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarios.controllers');


router.post('/', usuarioController.crearUsuario);      
router.get('/', usuarioController.obtenerUsuarios);     
router.get('/:id', usuarioController.obtenerUsuarioPorId);
router.put('/:id', usuarioController.actualizarUsuario);   
router.delete('/:id', usuarioController.eliminarUsuario);  

module.exports = router;