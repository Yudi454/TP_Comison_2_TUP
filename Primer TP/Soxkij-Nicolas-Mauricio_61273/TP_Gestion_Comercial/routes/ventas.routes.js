const express = require("express");
const router = express.Router();
const ventasController = require("../controllers/ventas.controllers");


router.get("/", ventasController.getVentas); //Descubri por error que se podia hacer de esta manera tambien
router.get("/:id", ventasController.getVentaById);
router.post("/", ventasController.createVenta);
router.put("/:id", ventasController.updateVenta);
router.delete("/:id", ventasController.deleteVenta);

module.exports = router;
