const { body, param } = require("express-validator");

const crearArtistaValidation = [
  body("nombre_artista")
    .notEmpty()
    .withMessage("El nombre del artista es obligatorio")
    .isLength({ max: 100 })
    .withMessage("El nombre no puede superar 100 caracteres"),

  body("tipo_arte_artista")
    .notEmpty()
    .withMessage("El tipo de arte es obligatorio")
    .isLength({ max: 50 })
    .withMessage("El tipo de arte no puede superar 50 caracteres"),

  body("biografia_artista")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar 500 caracteres"),

  body("email_artista")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ser un email válido"),

  body("contra_artista")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),

  body("telefono_artista")
    .notEmpty()
    .withMessage("El telefono es obligatorio"),
];

const actualizarArtistaValidation = [
  param("id_artista")
    .notEmpty()
    .withMessage("El id del artista es obligatorio")
    .isInt()
    .withMessage("El id debe ser un número entero"),

  body("nombre_artista").optional().isLength({ max: 100 }),
  body("tipo_arte_artista").optional().isLength({ max: 50 }),
  body("biografia_artista").optional().isLength({ max: 500 }),
  body("email_artista").optional().isEmail(),
  body("contra_artista").optional().isLength({ min: 6 }),
  body("telefono_artista").optional().isMobilePhone("es-AR"),
];

const idArtista = [
  param("id_artista")
    .notEmpty()
    .withMessage("El id del artista es obligatorio")
    .isInt()
    .withMessage("El id debe ser un número entero"),
];

module.exports = {
  crearArtistaValidation,
  actualizarArtistaValidation,
  idArtista,
};
