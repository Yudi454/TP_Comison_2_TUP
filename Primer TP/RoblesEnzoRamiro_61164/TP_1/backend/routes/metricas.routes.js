const express = require('express')
const {
  getMetricas,
  getMetricaById,
  createMetrica,
  updateMetrica,
  deleteMetrica
} = require('../controllers/metricas.controller.js')

const router = express.Router()

router.get('/metricas', getMetricas)
router.get('/metricas/:id', getMetricaById)
router.post('/metricas/agregar', createMetrica)
router.put('/metricas/editar/:id', updateMetrica)
router.delete('/metricas/eliminar/:id', deleteMetrica)

module.exports = router
