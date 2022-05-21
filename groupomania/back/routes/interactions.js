const express = require('express');
const auth = require('../middlewares/auth')
const router = express.Router();
const interactionCtrl = require('../controllers/interaction');

router.get('/:id', interactionCtrl.getAllComments);
router.post('/', auth, interactionCtrl.addComment);
router.delete('/:id', auth, interactionCtrl.deleteComment);
router.post('/like', auth, interactionCtrl.like);

module.exports = router;