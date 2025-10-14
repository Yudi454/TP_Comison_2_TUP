import Router from 'express';

import { borradoLogicoObservacion, crearObservacion, modificarObservacion, obtenerObservacionPorId, obtenerObservaciones } from '../controllers/observaciones.controller.js';

const router = Router();

// importaciones de controladores
router.get('/', obtenerObservaciones);
router.get('/:idObservacion', obtenerObservacionPorId);
router.post('/crearObservacion', crearObservacion);
router.put('/actualizarObservacion/:idObservacion', modificarObservacion);
router.put('/borrarObservacion/:idObservacion', borradoLogicoObservacion);

export default router;