import app from 'express';
import { 
  obtenerTodosLosProveedores, 
  obtenerProveedorPorId, 
  crearProveedor, 
  actualizarProveedor, 
  borrarProveedor 
} from '../controllers/proveedor.controllers.js';

const router = app.Router();

router.get('/obtener', obtenerTodosLosProveedores);
router.get('/proveedor/:id', obtenerProveedorPorId);
router.post('/crear', crearProveedor);
router.put('/actualizar/:id', actualizarProveedor);
router.delete('/borrar/:id', borrarProveedor);

export default router;