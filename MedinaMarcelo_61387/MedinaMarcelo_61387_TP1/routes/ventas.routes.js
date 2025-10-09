const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventas.controllers');

router.post('/', ventaController.crearVenta);
router.get('/', ventaController.obtenerVentas);
router.get('/:id', ventaController.obtenerVentaPorId);
router.put('/:id', ventaController.actualizarVenta);
router.delete('/:id', ventaController.eliminarVenta);

module.exports = router;
