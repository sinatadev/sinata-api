var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewArsipDesain, addArsipDesain, editArsipDesain, deleteArsipDesain } = require('../controllers/arsipDesain.controller')
const upload = require('../utils/upload.util')

router.get('/lihat', isLoginSuperAdmin, viewArsipDesain)
router.post('/tambah', isLoginSuperAdmin, upload.single('lampiran_file'), addArsipDesain)
router.put('/:id/edit', isLoginSuperAdmin, upload.single('lampiran_file'), editArsipDesain)
router.delete('/:id/delete', isLoginSuperAdmin, deleteArsipDesain)

module.exports = router