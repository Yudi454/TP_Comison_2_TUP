import {Router} from 'express';

// importaciones de controladores

import { crearUsuario,traerUsuarios,actualizarUsuario,borradoLogicoUsuario,traerActivos} from '../controllers/usuarios.controller.js';


const router = Router();

// Inicializo todas alas turas para los usuarios

// Metodo GET

router.get('/', traerUsuarios);
router.get('/activos', traerActivos);

// Metodo POST

router.post('/crear', crearUsuario);

// Metodo PUT

router.put('/actualizar/:idUsuario',actualizarUsuario);

// Metodo PUT para borrado logico

router.put('/eliminar/:idUsuario', borradoLogicoUsuario);

export default router;