const express = require("express");
const ctrl = require("../controllers/alumnos.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los alumnos
router.get("/", verifyToken, ctrl.getAll);

//Traer un alumno
router.get("/:id", verifyToken, ctrl.getById);

//Crear un alumno
router.post("/", verifyToken, ctrl.create);

//Editar un alumno
router.put("/:id", verifyToken, ctrl.update);

//Eliminar un alumno
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
