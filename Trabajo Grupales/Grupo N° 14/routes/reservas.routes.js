const express = require('express'); 

const {crearReserva} = require('../controllers/reservas.controller');

const router = express.Router();

router.post('/reservas/crearReserva', crearReserva);

module.exports = router;
