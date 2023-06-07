var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewPeminformasi, addPeminformasi, editPeminformasi, deletePemInformasi } = require('../controllers/peminformasi.controller')

router.get('/lihat', isLoginSuperAdmin, viewPeminformasi)
router.post('/tambah', isLoginSuperAdmin, addPeminformasi)
router.put('/:id/edit', isLoginSuperAdmin, editPeminformasi)
router.delete('/:id/delete', isLoginSuperAdmin, deletePemInformasi)

module.exports = router