const express = require('express');
const router = express.Router();
const  {mostrarTodosVentas, mostrarVentasInactivas, mostrarVentasPorId, crearVentas,
    actualizarVentas, eliminadoLogicoVentas, activarVentas} = require('../controllers/venta.controller');

    router.get("ventas/mostrar/activas", mostrarTodosVentas);
    router.get("ventas/mostrar/inactivas", mostrarVentasInactivas);
    router.get("ventas/mostrar/:id",mostrarVentasPorId);
    router.post("ventas/crear",crearVentas);
    router.put("ventas/actualizar",actualizarVentas);
    router.put("ventas/borrar",eliminadoLogicoVentas);
    router.put("ventas/activar",activarVentas);