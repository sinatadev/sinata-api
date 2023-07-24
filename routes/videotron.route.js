var express = require('express');
var router = express.Router();

const { isLoginAdmin, isLogin } = require('../middlewares/auth.middleware');
const {
	viewVideotron,
	addVideotron,
	editVideotron,
	deleteVideotron,
	viewOneVideotron,
	viewVideotronUser,
} = require('../controllers/videotron.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginAdmin, viewVideotron);
router.get('/:id/lihat', isLogin, viewOneVideotron);
router.post(
	'/tambah',
	isLogin,
	upload.fields([
		{ name: 'bahan_publikasi', maxCount: 1 },
		{ name: 'disposisi', maxCount: 1 },
		{ name: 'luaran_layanan', maxCount: 1 },
	]),
	addVideotron,
);
router.put(
	'/:id/edit',
	isLogin,
	upload.fields([
		{ name: 'bahan_publikasi', maxCount: 1 },
		{ name: 'disposisi', maxCount: 1 },
		{ name: 'luaran_layanan', maxCount: 1 },
	]),
	editVideotron,
);
router.delete('/:id/delete', isLogin, deleteVideotron);
router.get('/user/:id_account/lihat', isLogin, viewVideotronUser);

module.exports = router;
