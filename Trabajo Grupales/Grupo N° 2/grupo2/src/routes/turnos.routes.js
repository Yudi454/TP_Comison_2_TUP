import { Router } from "express";

// aqui iran las rutas importadas
import { solicitarTurno , traerTurnosPorFecha} from "../controllers/turnos.controller.js";
const router = Router();


// Rutas
//POST - Solicitar turno
router.post("/solicitarTurno", solicitarTurno);

// GET - listar turnos por fecha

router.get("/ListarTurnos/:fecha", traerTurnosPorFecha);

export default router;