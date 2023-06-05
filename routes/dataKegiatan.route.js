var express = require('express')
var router = express.Router()

const { isLogin } = require('../middlewares/auth.middleware')
const { viewDataKegiatan } = require('../controllers/dataKegiatan.controller')

router.get('/lihat', isLogin, viewDataKegiatan)

module.exports = router