const express = require('express');
const router = express.Router();
const metricasController = require('../controllers/metricas.controller.js');

// GET /api/metricas/ventas-totales
router.get('/ventas-totales', metricasController.getVentasTotales);

// GET /api/metricas/productos-mas-vendidos
router.get('/productos-mas-vendidos', metricasController.getProductosMasVendidos);

// GET /api/metricas/stock-bajo
router.get('/stock-bajo', metricasController.getStockBajo);

module.exports = router;