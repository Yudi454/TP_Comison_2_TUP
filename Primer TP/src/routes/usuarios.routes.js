import app from 'express';
import { actualizarUsuario, borrarUsuario, crearUsuario, obtenerUsuarios, obtenerUsuariosPorId } from '../controllers/usuarios.controllers.js';
const router = app.Router();

router.get('/obtener/', obtenerUsuarios);
router.get('/usuario/:id', obtenerUsuariosPorId);
router.post('/crear/', crearUsuario);
router.put('/actualizar/:id', actualizarUsuario);
router.delete('/borrar/:id', borrarUsuario);

export default router;