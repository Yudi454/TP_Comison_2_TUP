const express = require('express'); 

const { getAllSocios, crearSocio, modificarSocio,eliminarSocio} = require('../controllers/socios.controller');

const router = express.Router();

router.get('/socios', getAllSocios);
router.post('/socios/crearSocio', crearSocio);
router.put('/socios/modificarSocio/:id', modificarSocio);
router.delete('/socios/eliminarSocio/:id', eliminarSocio);


module.exports = router;