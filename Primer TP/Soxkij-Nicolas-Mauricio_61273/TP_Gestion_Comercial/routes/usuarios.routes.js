const express = require("express");
const router = express.Router();
const {getTodosUsuarios,getUnUsuario,setUnUsuario,updateUsuario,deleteUsuario} = require("../controllers/usuarios.controllers");


router.get("/", getTodosUsuarios);
router.get("/:id", getUnUsuario);
router.post("/", setUnUsuario);
router.put("/:id", updateUsuario);
router.delete("/:id", deleteUsuario);

module.exports = router;
