import Router from 'express';

// importacion de controladores
import { traerPacientes, traerPacientesActivos, traerPacientesInactivos, traerPacientePorId,crearPaciente, actualizarPaciente, borradoLogicoPaciente } from '../controllers/pacientes.controller.js';

const router = Router();

//Inicializo todas las rutas 

//Metodo GET
router.get('/pacientes', traerPacientes);
router.get('/pacientes/activos', traerPacientesActivos);    
router.get('/pacientes/inactivos', traerPacientesInactivos);
router.get('/pacientes/:idPaciente', traerPacientePorId);

//Metodo POST
router.post('/pacientes', crearPaciente);

//Metodo PUT
router.put('/pacientes/:idPaciente', actualizarPaciente);

//Metodo put par aborrado logico
router.put('/pacientes/:idPaciente', borradoLogicoPaciente);

export default router;