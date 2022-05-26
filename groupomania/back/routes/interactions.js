const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
const interactionCtrl = require('../controllers/interaction');

router.post('/', auth, interactionCtrl.addComment);
router.delete('/delete', auth, interactionCtrl.deleteComment);
router.post('/like', auth, interactionCtrl.like);

module.exports = router;