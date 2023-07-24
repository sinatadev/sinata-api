var express = require('express');
var router = express.Router();

const {
	isLoginSuperAdmin,
	isLogin,
} = require('../middlewares/auth.middleware');
const {
	viewArsipPers,
	addArsipPers,
	editArsipPers,
	deleteArsipPers,
	viewOneArsipPers,
	viewArsipPersUser,
} = require('../controllers/arsipPers.controller');

router.get('/lihat', isLoginSuperAdmin, viewArsipPers);
router.get('/:id/lihat', isLoginSuperAdmin, viewOneArsipPers);
router.post('/tambah', isLoginSuperAdmin, addArsipPers);
router.put('/:id/edit', isLoginSuperAdmin, editArsipPers);
router.delete('/:id/delete', isLoginSuperAdmin, deleteArsipPers);
router.get('/user/:id_account/lihat', isLogin, viewArsipPersUser);

module.exports = router;
