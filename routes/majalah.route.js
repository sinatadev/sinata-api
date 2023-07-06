var express = require('express');
var router = express.Router();

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware');
const {
  viewMajalah,
  addMajalah,
  editMajalah,
  deleteMajalah,
  viewOneMajalah,
} = require('../controllers/majalah.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewMajalah);
router.get('/:id/lihat', isLoginSuperAdmin, viewOneMajalah);
router.post(
  '/tambah',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  addMajalah,
);
router.put(
  '/:id/edit',
  isLoginSuperAdmin,
  upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
  ]),
  editMajalah,
);
router.delete('/:id/delete', isLoginSuperAdmin, deleteMajalah);

module.exports = router;
