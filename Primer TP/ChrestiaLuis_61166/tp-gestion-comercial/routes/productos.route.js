import { Router } from 'express'
import { deleteProducto, getProducto, getProductos, postProducto, putProducto } from '../controllers/productos.controller.js';

const route = Router();

route.get('/', getProductos)
route.get('/:id', getProducto)
route.post('/', postProducto)
route.put('/:id', putProducto)
route.delete('/:id', deleteProducto)

export default route;