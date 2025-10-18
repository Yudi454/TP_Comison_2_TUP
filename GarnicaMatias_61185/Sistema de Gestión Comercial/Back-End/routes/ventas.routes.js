const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller.js');

// GET /api/ventas
router.get('/', ventasController.getAllVentas);

// GET /api/ventas/:id
router.get('/:id', ventasController.getVentaById);

// POST /api/ventas
router.post('/', ventasController.createVenta);

// PUT /api/ventas/:id
router.put('/:id', ventasController.updateVenta);

// DELETE /api/ventas/:id
router.delete('/:id', ventasController.deleteVenta);

module.exports = router;