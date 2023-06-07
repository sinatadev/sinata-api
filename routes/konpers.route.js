var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewKonpers, addKonpers, editKonpers, deleteKonper } = require('../controllers/konpers.controller')

router.get('/lihat', isLoginSuperAdmin, viewKonpers)
router.post('/tambah', isLoginSuperAdmin, addKonpers)
router.put('/:id/edit', isLoginSuperAdmin, editKonpers)
router.delete('/:id/delete', isLoginSuperAdmin, deleteKonper)

module.exports = router