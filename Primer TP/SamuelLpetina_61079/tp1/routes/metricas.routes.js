const express = require('express');
const router = express.Router();
const metricasController = require('../controllers/metricas.controller');

router.get('/total-ventas', metricasController.totalVentas);
router.get('/productos-mas-vendidos', metricasController.productosMasVendidos);
router.get('/stock-bajo', metricasController.stockBajo);

module.exports = router;
