const express = require('express')
const {
  getVentas,
  getVentaById,
  createVenta,
  updateVenta,
  deleteVenta
} = require('../controllers/ventas.controller.js')

const router = express.Router()

router.get('/ventas', getVentas)
router.get('/ventas/:id', getVentaById)
router.post('/ventas/agregar', createVenta)
router.put('/ventas/editar/:id', updateVenta)
router.delete('/ventas/eliminar/:id', deleteVenta)

module.exports = router
