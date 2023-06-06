var express = require('express')
var router = express.Router()

const { viewAgenda, addAgenda } = require('../controllers/publikasiAgenda.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')

router.get('/lihat', viewAgenda)
router.post('/tambah', isLoginSuperAdmin, addAgenda)

module.exports = router