var express = require('express');
var router = express.Router();

const {
  viewAgenda,
  addAgenda,
  editAgenda,
  deleteAgenda,
  viewKalenderData,
  viewOneAgenda,
  viewAgendaUser,
} = require('../controllers/publikasiAgenda.controller');
const {
  isLoginSuperAdmin,
  isLogin,
} = require('../middlewares/auth.middleware');
const upload = require('../utils/upload.util');

router.get('/lihat', viewAgenda);
router.get('/:id/lihat', viewOneAgenda);
router.get('/kalenderdata', viewKalenderData);
router.post(
  '/tambah',
  isLogin,
  upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addAgenda,
);
router.put(
  '/:id/edit',
  isLogin,
  upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editAgenda,
);
router.delete('/:id/delete', isLogin, deleteAgenda);
router.get('/user/:id_account/lihat', isLogin, viewAgendaUser);

module.exports = router;
