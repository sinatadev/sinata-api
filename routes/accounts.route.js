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
const {
	isLoginSuperAdmin,
	isLogin,
} = require('../middlewares/auth.middleware');
const upload = require('../utils/upload.util');

router.get('/lihat', isLoginSuperAdmin, viewUsers);
router.post('/tambah', isLoginSuperAdmin, addUsers);
router.put('/:id/edit', isLoginSuperAdmin, editUser);
router.delete('/:id/delete', isLoginSuperAdmin, deleteUser);
router.put(
	'/:id/change-avatar',
	isLogin,
	upload.fields([{ name: 'img_profil', maxCount: 1 }]),
	changeAvatar,
);
router.put('/:id/change-profile', isLogin, changeProfile);
router.put('/:id/change-password', isLogin, changePassword);

module.exports = router;
