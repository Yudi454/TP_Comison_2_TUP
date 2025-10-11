import { Router } from "express";
import {
  traerProductos,
  crearProducto,
  traerProductosActivos,
  actualizarProducto,
  borradoLogicoProducto,
} from "../controllers/productos.controller.js";

const router = Router();

// Inicializo todas las rutas para los productos

// Metodos GET
router.get("/", traerProductos);
router.get("/activos", traerProductosActivos);
// Metodos POST
router.post("/crear", crearProducto);
// Metodos PUT
router.put("/actualizar/:idProducto", actualizarProducto);
// Metodos PUT para borrado logico
router.put("/eliminar/:idProducto", borradoLogicoProducto);

export default router;
