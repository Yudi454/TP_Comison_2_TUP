// Importamos express para usar el router
const express = require("express");

// Creamos una instancia del router
const router = express.Router();

// Importamos la función que maneja la lógica del login
const { authLogin } = require("../controllers/auth.controller"); 

// Ruta para hacer login y obtener el token JWT
router.post("/login", authLogin);

// Exportamos el router para usarlo en la app principal (app.js o index.js)
module.exports = router;
