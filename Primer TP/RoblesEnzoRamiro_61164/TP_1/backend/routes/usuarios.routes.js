const express = require('express')
const {
  getUsuarios,
  getUsuarioById,
  createUsuario,
  updateUsuario,
  deleteUsuario
} = require('../controllers/usuarios.controller.js')

const router = express.Router()

router.get('/usuarios', getUsuarios)
router.get('/usuarios/:id', getUsuarioById)
router.post('/usuarios/agregar', createUsuario)
router.put('/usuarios/editar/:id', updateUsuario)
router.delete('/usuarios/eliminar/:id', deleteUsuario)

module.exports = router
