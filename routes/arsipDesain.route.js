var express = require('express');
var router = express.Router();

const { isLoginAdmin } = require('../middlewares/auth.middleware');
const {
	viewArsipDesain,
	addArsipDesain,
	editArsipDesain,
	deleteArsipDesain,
} = require('../controllers/arsipDesain.controller');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginAdmin, viewArsipDesain);
router.post(
	'/tambah',
	isLoginAdmin,
	upload.single('lampiran_file'),
	addArsipDesain,
);
router.put(
	'/:id/edit',
	isLoginAdmin,
	upload.single('lampiran_file'),
	editArsipDesain,
);
router.delete('/:id/delete', isLoginAdmin, deleteArsipDesain);

module.exports = router;
