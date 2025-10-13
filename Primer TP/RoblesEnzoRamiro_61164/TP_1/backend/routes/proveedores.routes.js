const express = require('express')
const {
  getProveedores,
  getProveedorById,
  createProveedor,
  updateProveedor,
  deleteProveedor
} = require('../controllers/proveedores.controller.js')

const router = express.Router()

router.get('/proveedores', getProveedores)
router.get('/proveedores/:id', getProveedorById)
router.post('/proveedores/agregar', createProveedor)
router.put('/proveedores/editar/:id', updateProveedor)
router.delete('/proveedores/eliminar/:id', deleteProveedor)

module.exports = router
