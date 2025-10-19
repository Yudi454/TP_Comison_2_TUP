const express = require('express');
const router = express.Router();
const {mostrarTodosVentas, mostrarVentasInactivas, mostrarVentasPorId } = require("../controllers/detalle.ventas.controller")

module.exports = router;
 