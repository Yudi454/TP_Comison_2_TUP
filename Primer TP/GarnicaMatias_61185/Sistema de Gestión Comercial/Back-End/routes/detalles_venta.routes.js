const express = require('express');
const router = express.Router();
const detallesVentaController = require('../controllers/detalles_venta.controller.js');

// GET /api/detalles-venta/venta/:venta_id
router.get('/venta/:venta_id', detallesVentaController.getDetallesByVenta);

// POST /api/detalles-venta
router.post('/', detallesVentaController.createDetalleVenta);

// PUT /api/detalles-venta/:id
router.put('/:id', detallesVentaController.updateDetalleVenta);

// DELETE /api/detalles-venta/:id
router.delete('/:id', detallesVentaController.deleteDetalleVenta);

module.exports = router;