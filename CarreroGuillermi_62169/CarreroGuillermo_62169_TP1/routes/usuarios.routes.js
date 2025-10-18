import express from "express";
import { getUsuarios, getUsuarioById, crearUsuario, actualizarUsuario, eliminarUsuario } from "../controllers/usuarios.controller.js";

const router = express.Router();
router.get("/", getUsuarios);
router.get("/:id", getUsuarioById);
router.post("/", crearUsuario);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);
export default router;
