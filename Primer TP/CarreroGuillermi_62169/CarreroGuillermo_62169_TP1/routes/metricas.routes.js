import express from "express";
import { getMetricasGenerales, getTopProductos, getVentasPorMes } from "../controllers/metricas.controller.js";

const router = express.Router();
router.get("/", getMetricasGenerales);
router.get("/top-productos", getTopProductos);
router.get("/ventas-mes", getVentasPorMes);
export default router;
