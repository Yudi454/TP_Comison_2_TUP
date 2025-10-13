import { Router } from "express";
import { getVentas, createVenta, getVentaDetalle, deleteVenta } from "../controllers/ventas.controller.js";

const router = Router();

router.get("/", getVentas);
router.post("/", createVenta);
router.get("/:id/detalle", getVentaDetalle);
router.delete("/:id", deleteVenta);

export default router;
