var express = require('express');
var router = express.Router();

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const {
  viewBaliho,
  addBaliho,
  editBaliho,
  deleteBaliho,
  viewOneBaliho,
} = require('../controllers/baliho.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewBaliho);
router.get('/:id/lihat', isLoginSuperAdmin, viewOneBaliho);
router.post(
  '/tambah',
  isLoginSuperAdmin,
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
  isLoginSuperAdmin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'bukti_pembayaran', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
  ]),
  editBaliho,
);
router.delete('/:id/delete', isLoginSuperAdmin, deleteBaliho);

module.exports = router;
