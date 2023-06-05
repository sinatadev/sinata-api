var express = require('express')
var router = express.Router()

const { isLogin } = require('../middlewares/auth.middleware')
const { viewDataKegiatan, addDataKegiatan, editDataKegiatan, deleteDataKegiatan } = require('../controllers/dataKegiatan.controller')

// admins
router.get('/lihat', isLogin, viewDataKegiatan)
router.post('/tambah', isLogin, addDataKegiatan)
router.put('/edit/:id', isLogin, editDataKegiatan)
router.delete('/delete/:id', isLogin, deleteDataKegiatan)

// users

module.exports = router