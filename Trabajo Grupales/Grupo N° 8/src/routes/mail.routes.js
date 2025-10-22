const {testMailController}= require('../controllers/mail.controller');
const express = require('express');
const router = express.Router();

router.post('/test-mail', testMailController);

module.exports = router;