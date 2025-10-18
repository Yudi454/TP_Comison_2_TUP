const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller.js');

// GET /api/usuarios
router.get('/', usuariosController.getAllUsuarios);

// GET /api/usuarios/:id
router.get('/:id', usuariosController.getUsuarioById);

// POST /api/usuarios
router.post('/', usuariosController.createUsuario);

// PUT /api/usuarios/:id
router.put('/:id', usuariosController.updateUsuario);

// DELETE /api/usuarios/:id
router.delete('/:id', usuariosController.deleteUsuario);

module.exports = router;