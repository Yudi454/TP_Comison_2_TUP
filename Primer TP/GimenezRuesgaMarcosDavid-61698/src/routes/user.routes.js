import { Router } from "express";

// importaciones de controladores

import {
  crearUsuario,
  traerUsuarios,
  actualizarUsuario,
  borradoLogicoUsuario,
  traerUsuariosActivos,
} from "../controllers/user.controller.js";

const router = Router();

// Inicializo todas las rutas para los usuarios

// Metodos GET

router.get("/", traerUsuarios);
router.get("/activos", traerUsuariosActivos)

//Metodos POST
router.post("/crear", crearUsuario);

// Metodos PUT

router.put("/actualizar/:idUsuario", actualizarUsuario);

// Metodos PUT para borrado logico

router.put("/eliminar/:idUsuario", borradoLogicoUsuario);


export default router;