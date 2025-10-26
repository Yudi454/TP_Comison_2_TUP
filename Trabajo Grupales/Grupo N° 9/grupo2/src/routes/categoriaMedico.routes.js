import { Router } from "express";
import { borradoLogicoCategoriaMedico, crearCategoriaMedico, modificarCategoriaMedico, obtenerCategoriaMedicoPorId, obtenerCategoriasMedico } from "../controllers/categoriaMedico.controller.js";


const router = Router();

router.get('/', obtenerCategoriasMedico);
router.get('/:idCatMedico', obtenerCategoriaMedicoPorId);
router.post('/crearCategoriaMedico', crearCategoriaMedico);
router.put('/actualizarCategoriaMedico/:idCatMedico', modificarCategoriaMedico);
router.put('/borrarCategoriaMedico/:idCatMedico', borradoLogicoCategoriaMedico);

export default router;