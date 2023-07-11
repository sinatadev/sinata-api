var express = require('express');
var router = express.Router();

const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const {
  viewPeliputan,
  addPeliputan,
  editPeliputan,
  deletePeliputan,
  viewOnePeliputan,
  viewPeliputanUser,
} = require('../controllers/peliputan.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewPeliputan);
router.get('/:id/lihat', isLogin, viewOnePeliputan);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addPeliputan,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editPeliputan,
);
router.delete('/:id/delete', isLogin, deletePeliputan);
router.get('/user/:id_account/lihat', isLogin, viewPeliputanUser);

module.exports = router;
