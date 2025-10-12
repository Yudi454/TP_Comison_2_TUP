const express = require('express');
const router = express.Router();
const {mostrarClientesActivos,mostrarClientesInactivos,mostrarClientePorId,crearCliente,actualizarCliente,eliminarCliente,eliminarClienteLogico,reactivarClienteLogico} = require('../controllers/clientes.controller');

//fcion que muestre todos los clientes activarUsuario
router.get('/clientes/activos', mostrarClientesActivos);

//fcion que muestre todos los clientes inactivas
router.get('/clientes/inactivos', mostrarClientesInactivos);


//fcion que muestre cliente por id
router.get('/clientes/:id', mostrarClientePorId);

//fcion que cree un cliente
router.post('/clientes', crearCliente);

//fcion que actualice un cliente
router.put('/clientes/:id', actualizarCliente);


//fcion que elimine un cliente (borrado fisico)

router.delete('/clientes/:id', eliminarCliente);
//fcion que elimine un cliente (borrado logico)

router.patch('/clientes/:id', eliminarClienteLogico);

//fcion que reactive un cliente (borrado logico)
router.patch('/clientes/:id/reactivar', reactivarClienteLogico);