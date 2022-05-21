const express = require('express');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer');
const router = express.Router();
const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.publishPost);
router.patch('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

module.exports = router;