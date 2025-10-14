const express = require('express');
const router = express.Router();
const {mostrarTodosProductos, mostrarProductosInactivos,mostrarProductosPorId,crearProductos,actualizarProducto,
    eliminadoLogicoProducto,activarProducto} = require('../controllers/usuarios.controller');

router.get("/productos/mostrar/activos",mostrarTodosProductos)
router.get("/productos/mostrar/inactivos",mostrarProductosInactivos)
router.get("/productos/mostrar/:id",mostrarProductosPorId)
router.post("/productos/crear",crearProductos)
router.put("/productos/actualizar/:id",actualizarProducto)
router.delete("/productos/eliminar/:id",eliminadoLogicoProducto)
router.put("/productos/activar/:id",activarProducto)

module.export = router;