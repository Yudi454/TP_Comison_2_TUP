const express = require("express");
const router = express.Router();
const { getTotalVentasMes } = require("../controllers/metricas.controllers");


router.get("/", getTotalVentasMes);

module.exports = router;
