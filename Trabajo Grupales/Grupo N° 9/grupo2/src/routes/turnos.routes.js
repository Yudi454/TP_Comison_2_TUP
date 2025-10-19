import { Router } from "express";

// aqui iran las rutas importadas
import { cancelarTurno, solicitarTurno , traerTurnosPorFecha} from "../controllers/turnos.controller.js";
const router = Router();


// Rutas
//POST - Solicitar turno
router.post("/solicitarTurno", solicitarTurno);

// GET - listar turnos por fecha 

router.get("/ListarTurnos/:FechaRequeridaTurno", traerTurnosPorFecha);

//cancelar turno
router.put("/cancelarTurno/:idTurno", cancelarTurno);

export default router;