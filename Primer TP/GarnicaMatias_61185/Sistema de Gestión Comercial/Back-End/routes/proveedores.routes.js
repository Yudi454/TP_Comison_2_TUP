const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller.js');

// GET /api/proveedores
router.get('/', proveedoresController.getAllProveedores);

// GET /api/proveedores/:id
router.get('/:id', proveedoresController.getProveedorById);

// POST /api/proveedores
router.post('/', proveedoresController.createProveedor);

// PUT /api/proveedores/:id
router.put('/:id', proveedoresController.updateProveedor);

// DELETE /api/proveedores/:id
router.delete('/:id', proveedoresController.deleteProveedor);

module.exports = router;