var express = require('express');
var router = express.Router();

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const {
  viewPeminformasi,
  addPeminformasi,
  editPeminformasi,
  deletePemInformasi,
  viewOnePeminformasi,
} = require('../controllers/peminformasi.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewPeminformasi);
router.get('/:id/lihat', isLoginSuperAdmin, viewOnePeminformasi);
router.post(
  '/tambah',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addPeminformasi,
);
router.put(
  '/:id/edit',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editPeminformasi,
);
router.delete('/:id/delete', isLoginSuperAdmin, deletePemInformasi);

module.exports = router;
