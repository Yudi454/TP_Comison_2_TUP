import Router from 'express';

import { borradoLogicoMedico, crearMedico, modificarMedico, obtenerMedicoPorId, obtenerMedicos } from '../controllers/medicos.controller.js';

const router= Router();


// importaciones de controladores
router.get('/', obtenerMedicos);
router.get('/:idMedico', obtenerMedicoPorId);
router.post('/crearMedico', crearMedico);
router.put('/actualizarMedico/:idMedico', modificarMedico);
router.put('/borrarMedico/:idMedico', borradoLogicoMedico);

export default router;


