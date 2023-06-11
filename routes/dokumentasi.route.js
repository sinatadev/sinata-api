var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewDokumentasi, addDokumentasi, editDokumentasi, deleteDokumentasi } = require('../controllers/dokumentasi.controller')
const uploadDokumentasi = require('../utils/uploadDokumentasi.util')

router.get('/lihat', isLoginSuperAdmin, viewDokumentasi)
router.post('/tambah', isLoginSuperAdmin, uploadDokumentasi.array('files'), addDokumentasi),
router.put('/:id/edit', isLoginSuperAdmin, editDokumentasi)
router.delete('/:id/delete', isLoginSuperAdmin, deleteDokumentasi)

module.exports = router