import { Router } from 'express'
import { deleteProveedor, getProveedor, getProveedores, postProveedor, putProveedor } from '../controllers/proveedores.controller.js';

const route = Router();

route.get('/', getProveedores)
route.get('/:id', getProveedor)
route.post('/', postProveedor)
route.put('/:id', putProveedor)
route.delete('/:id', deleteProveedor)

export default route;