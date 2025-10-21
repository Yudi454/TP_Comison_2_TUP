const express = require("express");
const { loginUsuario } = require("../controllers/loginController");
const {verifyToken} = require("../middlewares/verifyToken")
const router = express.Router()


router.post("/login",verifyToken,loginUsuario) //ruta publica para el login






module.exports = router;