const express = require("express");

const { mostrarActividades, crearActividad } = require("../controllers/actividades.controller");

const router = express.Router();

router.get("/actividades", mostrarActividades);
router.post("/actividades/crearActividad", crearActividad);

module.exports = router;