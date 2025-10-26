const express = require('express');
const router = express.Router();
const {mostrarTodosProductos, mostrarProductosInactivos,mostrarProductosPorId,crearProductos,actualizarProducto,
    eliminadoLogicoProducto,activarProducto} = require('../controllers/productos.controller');

router.get("/mostrar/activos",mostrarTodosProductos)
router.get("/mostrar/inactivos",mostrarProductosInactivos)
router.get("/mostrar/:id",mostrarProductosPorId)
router.post("/crear",crearProductos)
router.put("/actualizar/:id",actualizarProducto)
router.delete("/eliminar/:id",eliminadoLogicoProducto)
router.put("/activar/:id",activarProducto)

module.exports = router;