const express = require('express');
const router = express.Router();
const {mostrarTodosUsuarios, mostrarUsuarioPorId,crearUsuario,actualizarUsuario,eliminarUsuario,activarUsuario} = require('../controllers/usuarios.controller');

router.get("/usuarios/mostrar/todos", mostrarTodosUsuarios);
router.get("/usuarios/mostrar/:id", mostrarUsuarioPorId);
router.post("/usuarios/crear", crearUsuario);
router.put("/usuarios/actualizar/:id", actualizarUsuario);
router.delete("/usuarios/eliminar/:id", eliminarUsuario);//borrado fisico de usuario
router.put("/usuarios/activar/:id", activarUsuario); // borrado logico de usuario

module.exports = router;