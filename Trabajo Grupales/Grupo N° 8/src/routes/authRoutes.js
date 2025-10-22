const express = require("express");

const { register, login } = require("../controllers/auth.controller");

const router = express.Router()

//Registro
router.post("/register",register);

//Login
router.post("/login",login)

module.exports = router