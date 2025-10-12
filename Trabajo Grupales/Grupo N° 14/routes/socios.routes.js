const express = require('express'); 

const { getAllSocios, crearSocio } = require('../controllers/socios.controller');

const router = express.Router();

router.get('/socios', getAllSocios);
router.post('/socios/crearSocio', crearSocio);

module.exports = router;