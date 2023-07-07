var express = require('express');
var router = express.Router();

const {
  viewAgenda,
  addAgenda,
  editAgenda,
  deleteAgenda,
  viewKalenderData,
  viewOneAgenda,
} = require('../controllers/publikasiAgenda.controller');
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const upload = require('../utils/upload.util');

router.get('/lihat', viewAgenda);
router.get('/:id/lihat', viewOneAgenda);
router.get('/kalenderdata', viewKalenderData);
router.post(
  '/tambah',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addAgenda,
);
router.put(
  '/:id/edit',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editAgenda,
);
router.delete('/:id/delete', isLoginSuperAdmin, deleteAgenda);

module.exports = router;
