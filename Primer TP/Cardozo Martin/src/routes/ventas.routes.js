import app from 'express';
import { crearUnaVenta } from '../controllers/ventas.controllers.js';

const router = app.Router();

router.post('/crear', crearUnaVenta);

export default router;