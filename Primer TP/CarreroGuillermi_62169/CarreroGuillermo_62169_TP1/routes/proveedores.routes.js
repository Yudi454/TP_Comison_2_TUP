import express from "express";
import { getProveedores, getProveedorById, crearProveedor, actualizarProveedor, eliminarProveedor } from "../controllers/proveedores.controller.js";

const router = express.Router();
router.get("/", getProveedores);
router.get("/:id", getProveedorById);
router.post("/", crearProveedor);
router.put("/:id", actualizarProveedor);
router.delete("/:id", eliminarProveedor);
export default router;
