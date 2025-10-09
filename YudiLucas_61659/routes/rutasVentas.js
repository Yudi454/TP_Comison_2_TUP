const express = require("express");
const {
  getAllVentas,
  getOneVenta,
  createVenta,
  updateVenta,
  deleteVenta,
  totalVentas,
  ventasPorVendedor,
  ventasPorFecha
} = require("../controllers/ventasController");

const router = express.Router();

// Traer todas las ventas
router.get("/", getAllVentas);

// Traer una venta
router.get("/:id", getOneVenta);

// Crear venta
router.post("/create", createVenta);

// Actualizar venta
router.patch("/update/:id", updateVenta);

// Eliminar venta
router.delete("/delete/:id", deleteVenta);

// Total de ventas
router.get("/total", totalVentas);

// Ventas por vendedor
router.get("/vendedor/:id_vendedor", ventasPorVendedor);

// Ventas por fecha
router.post("/fecha", ventasPorFecha);

module.exports = router;
