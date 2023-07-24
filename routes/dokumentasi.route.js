var express = require('express');
var router = express.Router();

const { isLoginAdmin } = require('../middlewares/auth.middleware');
const {
	viewDokumentasi,
	addDokumentasi,
	editDokumentasi,
	deleteDokumentasi,
} = require('../controllers/dokumentasi.controller');
const uploadDokumentasi = require('../utils/uploadDokumentasi.util');

router.get('/lihat', isLoginAdmin, viewDokumentasi);
router.post(
	'/tambah',
	isLoginAdmin,
	uploadDokumentasi.array('files'),
	addDokumentasi,
),
	router.put('/:id/edit', isLoginAdmin, editDokumentasi);
router.delete('/:id/delete', isLoginAdmin, deleteDokumentasi);

module.exports = router;
