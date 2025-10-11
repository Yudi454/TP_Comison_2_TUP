const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller.js');

// GET /api/productos
router.get('/', productosController.getAllProductos);

// GET /api/productos/:id
router.get('/:id', productosController.getProductoById);

// POST /api/productos
router.post('/', productosController.createProducto);

// PUT /api/productos/:id
router.put('/:id', productosController.updateProducto);

// DELETE /api/productos/:id
router.delete('/:id', productosController.deleteProducto);

module.exports = router;