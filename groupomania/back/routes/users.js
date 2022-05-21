const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')
const userCtrl = require('../controllers/users');

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.delete('/:id', auth, userCtrl.delete);

module.exports = router;