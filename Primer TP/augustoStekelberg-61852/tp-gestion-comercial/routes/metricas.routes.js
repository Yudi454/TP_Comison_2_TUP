const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/metricas.controller');

router.get('/', ctrl.resumen);

module.exports = router;
