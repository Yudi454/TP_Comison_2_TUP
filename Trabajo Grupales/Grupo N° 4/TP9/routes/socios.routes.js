const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/socios.controller');

router.get('/', ctrl.getAll);
router.post('/', ctrl.create);

module.exports = router;