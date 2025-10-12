import { Router } from "express";
import {
  traerVentas,
  traerVentaPorId,
  crearUnaVenta,
} from "../controllers/ventas.controller.js";

const router = Router();

// Inicializo todas las rutas para las ventas

// Metodos GET
router.get("/", traerVentas);
router.get("/:idVenta", traerVentaPorId);

// Metodos POST
router.post("/crear", crearUnaVenta);
export default router;