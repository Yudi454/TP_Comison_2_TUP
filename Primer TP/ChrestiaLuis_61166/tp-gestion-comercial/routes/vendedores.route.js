import { Router } from 'express'
import { deleteVendedor, getVendedor, getVendedores, postVendedor, putVendedor } from '../controllers/vendedores.controller.js';

const route = Router();

route.get('/', getVendedores)
route.get('/:id', getVendedor)
route.post('/', postVendedor)
route.put('/:id', putVendedor)
route.delete('/:id', deleteVendedor)

export default route;