const express = require('express');
const { mostrarReservas, crearReserva, eliminarReserva } = require('../controllers/reservas.controller');

const router = express.Router();

// Listar todas las reservas
router.get('/reservas', mostrarReservas);

// Crear nueva reserva
router.post('/reservas/crearReserva', crearReserva);

// Eliminar una reserva por ID
router.delete('/reservas/:idReserva', eliminarReserva);

module.exports = router;
