const express = require('express');
const router = express.Router();
const  {mostrarTodosVentas, mostrarVentasInactivas, mostrarVentasPorId, crearVentas,
    actualizarVentas, eliminadoLogicoVentas, activarVentas} = require('../controllers/venta.controller');

    router.get("/mostrar/activas", mostrarTodosVentas);
    router.get("/mostrar/inactivas", mostrarVentasInactivas);
    router.get("/mostrar/:id",mostrarVentasPorId);
    router.post("/crear",crearVentas);
    router.put("/actualizar",actualizarVentas);
    router.put("/borrar",eliminadoLogicoVentas);
    router.put("/activar",activarVentas);

module.exports = router;