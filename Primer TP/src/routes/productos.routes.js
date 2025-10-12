import app from 'express';
import { actualizarProducto, borrarProducto, crearProducto, obtenerProductoPorId, obtenerTodosLosProductos } from '../controllers/producto.controllers.js';



const router = app.Router();

router.get('/obtener', obtenerTodosLosProductos);
router.get('/producto/:id', obtenerProductoPorId);
router.post('/crear', crearProducto);
router.put('/actualizar/:id', actualizarProducto);
router.delete('/borrar/:id', borrarProducto);

export default router;