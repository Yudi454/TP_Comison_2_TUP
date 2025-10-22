const express = require('express');
const {recuperarPassword} = require('../controllers/auth.controller');
const router = express.Router();

router.post('/recuperar-password', recuperarPassword);

module.exports = router;