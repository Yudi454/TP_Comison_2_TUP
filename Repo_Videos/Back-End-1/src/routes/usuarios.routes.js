const express = require('express');
const router = express.Router();
const {mostrarTodosUsuarios, mostrarUsuariosInactivos,mostrarUsuarioPorId,
    crearUsuario,actualizarUsuario,eliminadoLogicoUsuario,activarUsuario} = require('../controllers/usuarios.controller');

const { verifyToken } = require('../middleware/auth.middleware');

router.get("/mostrar/todos",verifyToken, mostrarTodosUsuarios);
router.get("/mostrar/:id", mostrarUsuarioPorId);
router.post("/crear", crearUsuario);
router.put("/actualizar/:id", actualizarUsuario);
router.delete("/eliminar/:id",eliminadoLogicoUsuario);//borrado fisico de usuario
router.put("/activar/:id", activarUsuario); // borrado logico de usuario

//Usuarios inactivos (activo = 0)

router.get("/mostrar/inactivos", mostrarUsuariosInactivos);
router.put("/activar/:id", activarUsuario); // borrado logico de usuario

module.exports = router;