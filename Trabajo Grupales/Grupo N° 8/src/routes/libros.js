const express = require("express");
const ctrl = require("../controllers/libros.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los libros
router.get("/", verifyToken, ctrl.getAll);

//Traer un libro
router.get("/:id", verifyToken, ctrl.getById);

//Crear un libro
router.post("/", verifyToken, ctrl.create);

//Editar un libro
router.put("/:id", verifyToken, ctrl.update);

//Eliminar un libro
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
