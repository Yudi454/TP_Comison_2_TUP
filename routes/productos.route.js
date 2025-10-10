import { Router } from "express";
import { getProductos, getProductoId, createProducto, updateProducto, deleteProducto } from "../controllers/productos.controller.js";

const router = Router();

router.get('/productos', getProductos);
router.get('/productos/:id', getProductoId);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

export default router;