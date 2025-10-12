const express = require("express");
const {
  getAllUsuarios,
  getOneUsuario,
  deleteUsuario,
  updateUsuario,
  createUsuario,
} = require("../controllers/usuariosController");

const router = express.Router();

//Traer todos los stock
router.get("/", getAllStock);

//Traer un stock
router.get("/:id", getOneStock);

//Eliminar stock
router.delete("/delete/:id", deleteStock);

//Actualizar stock
router.patch("/update/:id", updateStock);

//Crear stock
router.post("/create", createStock);

module.exports = router;
