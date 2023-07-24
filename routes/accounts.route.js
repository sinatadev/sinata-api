var express = require('express');
var router = express.Router();

const {
	viewUsers,
	addUsers,
	editUser,
	deleteUser,
	changeAvatar,
	changePassword,
	changeProfile,
} = require('../controllers/accounts.controller');
const { isLoginAdmin, isLogin } = require('../middlewares/auth.middleware');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginAdmin, viewUsers);
router.post('/tambah', isLoginAdmin, addUsers);
router.put('/:id/edit', isLoginAdmin, editUser);
router.delete('/:id/delete', isLoginAdmin, deleteUser);
router.put(
	'/:id/change-avatar',
	isLogin,
	upload.fields([{ name: 'img_profil', maxCount: 1 }]),
	changeAvatar,
);
router.put('/:id/change-profile', isLogin, changeProfile);
router.put('/:id/change-password', isLogin, changePassword);

module.exports = router;
