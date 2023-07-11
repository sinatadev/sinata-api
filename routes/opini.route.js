var express = require('express');
var router = express.Router();

const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const {
  viewOpini,
  addOpini,
  editOpini,
  deleteOpini,
  viewOneOpini,
  viewOpiniUser,
} = require('../controllers/opini.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewOpini);
router.get('/:id/lihat', isLogin, viewOneOpini);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'foto_penulis', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addOpini,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'foto_penulis', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editOpini,
);
router.delete('/:id/delete', isLogin, deleteOpini);
router.get('/user/:id_account/lihat', isLogin, viewOpiniUser);

module.exports = router;
