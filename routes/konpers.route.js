var express = require('express');
var router = express.Router();

const { isLoginAdmin, isLogin } = require('../middlewares/auth.middleware');
const {
	viewKonpers,
	addKonpers,
	editKonpers,
	deleteKonpers,
	viewOneKonpers,
	viewKonpersUser,
} = require('../controllers/konpers.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginAdmin, viewKonpers);
router.get('/:id/lihat', isLogin, viewOneKonpers);
router.post(
	'/tambah',
	isLogin,
	upload.fields([
		{ name: 'surat_permohonan', maxCount: 1 },
		{ name: 'leaflet_kegiatan', maxCount: 1 },
		{ name: 'disposisi', maxCount: 1 },
	]),
	addKonpers,
);
router.put(
	'/:id/edit',
	isLogin,
	upload.fields([
		{ name: 'surat_permohonan', maxCount: 1 },
		{ name: 'leaflet_kegiatan', maxCount: 1 },
		{ name: 'disposisi', maxCount: 1 },
	]),
	editKonpers,
);
router.delete('/:id/delete', isLogin, deleteKonpers);
router.get('/user/:id_account/lihat', isLogin, viewKonpersUser);

module.exports = router;
