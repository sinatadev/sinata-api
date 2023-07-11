var express = require('express');
var router = express.Router();

const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const {
  viewMajalah,
  addMajalah,
  editMajalah,
  deleteMajalah,
  viewOneMajalah,
  viewMajalahUser,
} = require('../controllers/majalah.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewMajalah);
router.get('/:id/lihat', isLogin, viewOneMajalah);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
  ]),
  addMajalah,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
  ]),
  editMajalah,
);
router.delete('/:id/delete', isLogin, deleteMajalah);
router.get('/user/:id_account/lihat', isLogin, viewMajalahUser);

module.exports = router;
