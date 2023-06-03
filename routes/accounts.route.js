var express = require('express')
var router = express.Router()

const { viewUsers, addUsers, editUser } = require('../controllers/accounts.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')

router.get('/lihat', isLoginSuperAdmin, viewUsers)
router.post('/tambah', isLoginSuperAdmin, addUsers)
router.patch('/edit/:id', isLoginSuperAdmin, editUser)

module.exports = router