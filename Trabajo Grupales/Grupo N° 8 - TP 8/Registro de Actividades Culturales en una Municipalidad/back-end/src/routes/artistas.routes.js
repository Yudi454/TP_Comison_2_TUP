const express = require("express");
const router = express.Router();

const {
  obtenerTodos,
  obtenerPorEvento,
  obtenerUno,
  crear,
  actualizar,
  eliminar,
} = require("../controllers/artistasControllers");

const {
  crearArtistaValidation,
  actualizarArtistaValidation,
  idArtista,
} = require("../validators/artista.validator");

const validateInput = require("../middlewares/validateInput");
const verifyToken = require("../middlewares/auth.middlewares"); // Middleware de autenticación

// 🔹 Obtener todos los artistas activos (protegido)
router.get("/", verifyToken, obtenerTodos);

// 🔹 Obtener un artista por id (protegido)
router.get(
  "/getOne/:id_artista",
  verifyToken,
  idArtista,
  validateInput,
  obtenerUno
);

// 🔹 Obtener artistas de un evento específico (protegido)
router.get(
  "/evento/:id_evento",
  verifyToken,
  obtenerPorEvento
);

// 🔹 Crear artista (protegido)
router.post(
  "/create",
  verifyToken,
  crearArtistaValidation,
  validateInput,
  crear
);

// 🔹 Actualizar artista (protegido)
router.put(
  "/update/:id_artista",
  verifyToken,
  actualizarArtistaValidation,
  validateInput,
  actualizar
);

// 🔹 Borrado lógico de artista (protegido)
router.delete("/delete/:id_artista", verifyToken, idArtista, validateInput, eliminar);

module.exports = router;
