const express = require("express");
const { obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario } = require("../controllers/usuarios.controller");

const router = express.Router();

router.post("/usuario/id", obtenerUsuarioPorId); 
router.post("/usuario", crearUsuario);
router.put("/usuario", actualizarUsuario);
router.delete("/usuario", eliminarUsuario);

module.exports = router;
