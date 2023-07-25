var express = require('express');
var router = express.Router();

const {
	isLoginAdmin,
	isLogin,
	isAuthArsipPers,
} = require('../middlewares/auth.middleware');
const {
	viewArsipPers,
	addArsipPers,
	editArsipPers,
	deleteArsipPers,
	viewOneArsipPers,
	viewArsipPersUser,
} = require('../controllers/arsipPers.controller');

router.get('/lihat', isLoginAdmin, viewArsipPers);
router.get('/:id/lihat', isLoginAdmin, viewOneArsipPers);
router.post('/tambah', isAuthArsipPers, addArsipPers);
router.put('/:id/edit', isAuthArsipPers, editArsipPers);
router.delete('/:id/delete', isAuthArsipPers, deleteArsipPers);
router.get('/user/:id_account/lihat', isLogin, viewArsipPersUser);

module.exports = router;
