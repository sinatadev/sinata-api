var express = require('express');
var router = express.Router();

const { isLoginAdmin, isLogin } = require('../middlewares/auth.middleware');
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
router.post('/tambah', isLoginAdmin, addArsipPers);
router.put('/:id/edit', isLoginAdmin, editArsipPers);
router.delete('/:id/delete', isLoginAdmin, deleteArsipPers);
router.get('/user/:id_account/lihat', isLogin, viewArsipPersUser);

module.exports = router;
