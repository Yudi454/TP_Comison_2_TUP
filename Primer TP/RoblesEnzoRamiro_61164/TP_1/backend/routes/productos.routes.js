const express = require('express')
const {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/productos.controller.js')

const router = express.Router()

router.get('/productos', getProductos)
router.get('/productos/:id', getProductoById)
router.post('/productos/agregar', createProducto)
router.put('/productos/editar/:id', updateProducto)
router.delete('/productos/eliminar/:id', deleteProducto)

module.exports = router
