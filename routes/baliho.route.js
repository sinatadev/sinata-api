var express = require('express');
var router = express.Router();

const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const {
  viewBaliho,
  addBaliho,
  editBaliho,
  deleteBaliho,
  viewOneBaliho,
  viewBalihoUser,
} = require('../controllers/baliho.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewBaliho);
router.get('/:id/lihat', isLogin, viewOneBaliho);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'bukti_pembayaran', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
  ]),
  addBaliho,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'bukti_pembayaran', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
  ]),
  editBaliho,
);
router.delete('/:id/delete', isLogin, deleteBaliho);
router.get('/user/:id_account/lihat', isLogin, viewBalihoUser);

module.exports = router;
