var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewOpini } = require('../controllers/opini.controller')

router.get('/lihat', isLoginSuperAdmin, viewOpini)

module.exports = router