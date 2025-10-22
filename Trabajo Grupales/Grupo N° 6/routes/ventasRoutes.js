const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');



router.get('/', ventaController.getVentas);
router.post('/', ventaController.createVenta);


module.exports = router;