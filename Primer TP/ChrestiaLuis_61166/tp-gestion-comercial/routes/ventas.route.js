import { Router } from 'express'
import { deleteVenta, getVenta, getVentas, postVenta, putVenta } from '../controllers/ventas.controller.js';

const route = Router();

route.get('/', getVentas)
route.get('/:id', getVenta)
route.post('/', postVenta)
route.put('/:id', putVenta)
route.delete('/:id', deleteVenta)

export default route;