var express = require('express');
var router = express.Router();

const { isLogin, isLoginAdmin } = require('../middlewares/auth.middleware');
const {
	viewDataKegiatan,
	addDataKegiatan,
	editDataKegiatan,
	deleteDataKegiatan,
	viewDataKegiatanUser,
} = require('../controllers/dataKegiatan.controller');
const upload = require('../utils/upload.util');

// admins
router.get('/lihat', isLogin, viewDataKegiatan);
router.get('/:id/lihat', isLogin, viewDataKegiatan);
router.post(
	'/tambah',
	isLogin,
	upload.fields([
		{ name: 'surat_permohonan', maxCount: 1 },
		{ name: 'sik', maxCount: 1 },
	]),
	addDataKegiatan,
);
router.put(
	'/:id/edit',
	isLogin,
	upload.fields([
		{ name: 'surat_permohonan', maxCount: 1 },
		{ name: 'sik', maxCount: 1 },
	]),
	editDataKegiatan,
);
router.delete('/:id/delete', isLogin, deleteDataKegiatan);

// users
router.get('/user/:id_account/lihat', isLogin, viewDataKegiatanUser);

module.exports = router;
