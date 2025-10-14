const express = require('express');
const { getPrestamos, getPrestamosPorId, crearPrestamo, actualizarPrestamo, eliminarPrestamo } = require('../controllers/prestamos.controller');

const router = express.Router();

router.get('/prestamos', getPrestamos);
router.get('/prestamos/:id_prestamo', getPrestamosPorId);
router.post('/prestamo', crearPrestamo);
router.put('/prestamo', actualizarPrestamo);
router.delete('/prestamo', eliminarPrestamo);

module.exports = router;