const express = require('express');
const router = express.Router();
const metricasController = require('../controllers/metricas.controller');

router.get('/ventas-por-usuario', metricasController.ventasPorUsuario);
router.get('/productos-mas-vendidos', metricasController.productosMasVendidos);
router.get('/stock', metricasController.stockRestante);

module.exports = router;
