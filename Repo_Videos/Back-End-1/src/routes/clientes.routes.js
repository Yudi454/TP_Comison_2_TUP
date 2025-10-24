const express = require('express');
const router = express.Router();
const {mostrarClientesActivos,mostrarClientesInactivos,mostrarClientePorId,
    crearCliente,actualizarCliente,eliminarCliente,eliminarClienteLogico,
    reactivarClienteLogico} = require('../controllers/clientes.controller');
  

//fcion que muestre todos los clientes activarUsuario
router.get('/activos', mostrarClientesActivos);

//fcion que muestre todos los clientes inactivas
router.get('/inactivos', mostrarClientesInactivos);


//fcion que muestre cliente por id
router.get('/:id', mostrarClientePorId);

//fcion que cree un cliente
router.post('/', crearCliente);

//fcion que actualice un cliente
router.put('/clientes/:id', actualizarCliente);


//fcion que elimine un cliente (borrado fisico)

router.delete('/:id', eliminarCliente);
//fcion que elimine un cliente (borrado logico)

router.patch('/:id', eliminarClienteLogico);

//fcion que reactive un cliente (borrado logico)
router.patch('/:id/reactivar', reactivarClienteLogico);

module.exports = router;