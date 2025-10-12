import { Router } from "express";

// importaciones de controladores
import { crearProveedor, traerProveedores, actualizarProveedor, traerPorveedoresActivos, borradoLogicoProveedor } from "../controllers/proveedores.controller.js";

const router = Router();    

// Inicializo todas las rutas para los proveedores

// Metodo GET   
router.get('/', traerProveedores);
router.get('/activos', traerPorveedoresActivos);

// Metodo POST
router.post('/crear', crearProveedor);

// Metodo PUT
router.put('/actualizar/:idProveedor', actualizarProveedor);

// Metodo PUT para borrado logico
router.put('/eliminar/:idProveedor', borradoLogicoProveedor);


export default router;