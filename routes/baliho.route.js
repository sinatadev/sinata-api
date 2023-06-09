var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewBaliho } = require('../controllers/baliho.controller')

router.get('/lihat', isLoginSuperAdmin, viewBaliho)

module.exports = router