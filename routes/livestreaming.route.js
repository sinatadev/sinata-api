var express = require('express');
var router = express.Router();

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const {
  viewLiveStreaming,
  addLiveStreaming,
  editLiveStreaming,
  deleteLiveStreaming,
  viewOneLiveStreaming,
} = require('../controllers/livestreaming.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewLiveStreaming);
router.get('/:id/lihat', isLoginSuperAdmin, viewOneLiveStreaming);
router.post(
  '/tambah',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'thumbnail_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addLiveStreaming,
);
router.put(
  '/:id/edit',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'thumbnail_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editLiveStreaming,
);
router.delete('/:id/delete', isLoginSuperAdmin, deleteLiveStreaming);

module.exports = router;
