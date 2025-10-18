import express from "express";
import { getVentas, getVentaById, crearVenta, eliminarVenta } from "../controllers/ventas.controller.js";

const router = express.Router();
router.get("/", getVentas);
router.get("/:id", getVentaById);
router.post("/", crearVenta);
router.delete("/:id", eliminarVenta);
export default router;
