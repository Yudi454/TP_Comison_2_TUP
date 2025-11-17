// routes/ventas.js
const express = require("express");
const router = express.Router();

const {
  obtenerTodas,
  obtenerUna,
  obtenerPorEvento,
  crearVenta,
  totalVentasPorEventos,
  totalVentasPorEvento,
} = require("../controllers/ventas_boletos.controllers");
const validateInput = require("../middlewares/validateInput");
const verifyToken = require("../middlewares/auth.middlewares");

const {
  crearVentaValidation,
  idVentaParamValidation,
  idEventoParamValidation,
} = require("../validators/venta.validator");

// Obtener todas las ventas
router.get("/", verifyToken, obtenerTodas);

// Obtener una venta por id_venta_boleto
router.get(
  "/:id_venta_boleto",
  verifyToken,
  idVentaParamValidation,
  validateInput,
  obtenerUna
);

// Obtener ventas por evento
router.get(
  "/evento/:id_evento",
  verifyToken,
  idEventoParamValidation,
  validateInput,
  obtenerPorEvento
);

// Crear venta (usa validaciones y devuelve mensaje)
router.post("/create", verifyToken, crearVentaValidation, validateInput, crearVenta);

// Totales por todos los eventos
router.get("/totales/por-eventos", verifyToken, totalVentasPorEventos);

// Total de ventas para un evento específico
router.get(
  "/totales/:id_evento",
  verifyToken,
  idEventoParamValidation,
  validateInput,
  totalVentasPorEvento
);

module.exports = router;
