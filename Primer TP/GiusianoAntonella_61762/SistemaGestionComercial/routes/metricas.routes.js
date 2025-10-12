const express = require('express');
const router = express.Router();
const metricasController = require('../controllers/metricas.controller');

router.get('/top-vendedores', metricasController.topVendedores); 
router.get('/stock-critico', metricasController.stockCritico);   
router.get('/ventas-por-dia', metricasController.ventasPorDia);  

module.exports = router;