const express = require("express");
const { registrarVenta } = require("../controllers/ventas.controller");

const router = express.Router();

router.post("/venta", registrarVenta);

module.exports = router;