const express = require("express");
const { cantidadVentas, montoTotalVentas } = require("../controllers/metricas.controller");

const router = express.Router();

router.get("/metrica/cantidad-ventas", cantidadVentas);
router.get("/metrica/monto-total-ventas", montoTotalVentas);

module.exports = router;
