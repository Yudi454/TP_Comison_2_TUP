const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/pagos.controller');

router.get('/', ctrl.listar);
router.get('/deudas/:socioId', ctrl.deudas);
router.post('/', ctrl.registrar);

module.exports = router;
