import express from "express";
import { getProductos, getProductoById, crearProducto, actualizarProducto, eliminarProducto } from "../controllers/productos.controller.js";

const router = express.Router();
router.get("/", getProductos);
router.get("/:id", getProductoById);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);
export default router;
