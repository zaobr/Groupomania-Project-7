const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userCtrl = require('../controllers/users');
const multer = require('../middlewares/multer');

router.post('/login', userCtrl.login);
router.post('/signup', multer, userCtrl.signup);
router.get('/profile', auth, userCtrl.getUser);
router.delete('/delete', auth, userCtrl.delete);

module.exports = router;