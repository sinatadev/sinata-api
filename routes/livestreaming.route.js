var express = require('express');
var router = express.Router();

const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const {
  viewLiveStreaming,
  addLiveStreaming,
  editLiveStreaming,
  deleteLiveStreaming,
  viewOneLiveStreaming,
  viewLiveStreamingUser,
} = require('../controllers/livestreaming.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewLiveStreaming);
router.get('/:id/lihat', isLogin, viewOneLiveStreaming);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'thumbnail_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addLiveStreaming,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'thumbnail_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editLiveStreaming,
);
router.delete('/:id/delete', isLogin, deleteLiveStreaming);
router.get('/user/:id_account/lihat', isLogin, viewLiveStreamingUser);

module.exports = router;
