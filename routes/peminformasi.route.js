var express = require('express');
var router = express.Router();

const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const {
  viewPeminformasi,
  addPeminformasi,
  editPeminformasi,
  deletePemInformasi,
  viewOnePeminformasi,
  viewPeminformasiUser,
} = require('../controllers/peminformasi.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewPeminformasi);
router.get('/:id/lihat', isLogin, viewOnePeminformasi);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addPeminformasi,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editPeminformasi,
);
router.delete('/:id/delete', isLogin, deletePemInformasi);
router.get('/user/:id_account/lihat', isLogin, viewPeminformasiUser);

module.exports = router;
