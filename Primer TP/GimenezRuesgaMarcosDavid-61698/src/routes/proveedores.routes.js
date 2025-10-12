import {Router} from 'express';

import { traerProveedores, crearProveedor, actualizarProveedor, borradoLogicoProveedor, traerProveedoresActivos } from '../controllers/proveedores.controller.js';

const router = Router();


// Inicializo todas las rutas para los proveedores

// Metodos GET  
router.get('/', traerProveedores);
router.get('/activos', traerProveedoresActivos);

// Metodos POST
router.post('/crear', crearProveedor);

// Metodos PUT
router.put('/actualizar/:idProveedor', actualizarProveedor);

// Metodos PUT para borrado logico
router.put('/eliminar/:idProveedor', borradoLogicoProveedor);


export default router;