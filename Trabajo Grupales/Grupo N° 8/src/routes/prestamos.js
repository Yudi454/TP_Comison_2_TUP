const express = require("express");
const ctrl = require("../controllers/prestamos.controller");
const verifyToken = require("../middlewares/verifyToken");
const router = express.Router();

//Traer todos los prestamos
router.get("/", verifyToken, ctrl.getAll);

//Traer un prestamo
router.get("/:id", verifyToken, ctrl.getById);

//Crear un prestamo
router.post("/", verifyToken, ctrl.create);

//Editar un prestamo
router.put("/:id", verifyToken, ctrl.update);

//Eliminar un prestamo
router.delete("/:id", verifyToken, ctrl.remove);

module.exports = router;
