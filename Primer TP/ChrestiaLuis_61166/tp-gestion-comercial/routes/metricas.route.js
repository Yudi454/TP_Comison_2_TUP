import { Router } from 'express'
import { getMayorCantidad, getPopularProductos } from '../controllers/metricas.controller.js';

const route = Router();

route.get('/populares', getPopularProductos)
route.get('/mayor', getMayorCantidad)


export default route;