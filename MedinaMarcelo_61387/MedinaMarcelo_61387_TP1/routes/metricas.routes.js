const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/metricas.controllers');

router.get('/resumen', ctrl.getResumenVentas);
router.post('/agregar', ctrl.agregarDetalleVenta);
router.get('/por-dia', ctrl.ventasPorDia);
router.get('/por-semana', ctrl.ventasPorSemana);

module.exports = router;
