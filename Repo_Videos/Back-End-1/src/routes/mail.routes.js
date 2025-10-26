const {Router} = require('express');
const router = Router();
const {testMailController} = require('../controllers/mail.controller');

router.post('/test-mail', testMailController);

module.exports = router;