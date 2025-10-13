const express = require("express");

const {
  entradaStock,
  salidaStock,
  getAllMovimientos,
  getMovimientoPorProducto,
} = require("../controllers/movimientosController");

const router = express.Router();

//Entrada de stock
router.post("/entrada/:id", entradaStock);

//Salida de stock
router.post("/salida/:id", salidaStock);

//Traer todos los movimientos
router.get("/", getAllMovimientos);

//Traer movimientos por producto
router.get("/:id", getMovimientoPorProducto);

module.exports = router;
