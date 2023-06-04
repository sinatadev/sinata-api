var express = require('express')
var router = express.Router()

const { viewUsers, addUsers, editUser, deleteUser } = require('../controllers/accounts.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')

router.get('/lihat', isLoginSuperAdmin, viewUsers)
router.post('/tambah', isLoginSuperAdmin, addUsers)
router.put('/edit/:id', isLoginSuperAdmin, editUser)
router.delete('/delete/:id', isLoginSuperAdmin, deleteUser)

module.exports = router