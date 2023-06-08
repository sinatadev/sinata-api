var express = require('express')
var router = express.Router()

const { viewUsers, addUsers, editUser, deleteUser, changeAvatar } = require('../controllers/accounts.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const upload = require('../utils/upload.util')

router.get('/lihat', isLoginSuperAdmin, viewUsers)
router.post('/tambah', isLoginSuperAdmin, addUsers)
router.put('/:id/edit', isLoginSuperAdmin, editUser)
router.delete('/:id/delete', isLoginSuperAdmin, deleteUser)
router.put('/:id/change-avatar', isLoginSuperAdmin, upload.single('img_profil'), changeAvatar)

module.exports = router