var express = require('express');
var router = express.Router();

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const {
  viewKonpers,
  addKonpers,
  editKonpers,
  deleteKonpers,
  viewOneKonpers,
} = require('../controllers/konpers.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewKonpers);
router.get('/:id/lihat', isLoginSuperAdmin, viewOneKonpers);
router.post(
  '/tambah',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addKonpers,
);
router.put(
  '/:id/edit',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editKonpers,
);
router.delete('/:id/delete', isLoginSuperAdmin, deleteKonpers);

module.exports = router;
