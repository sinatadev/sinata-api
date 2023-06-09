var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewOpini, addOpini, editOpini, deleteOpini } = require('../controllers/opini.controller')
const upload = require('../utils/upload.util')

router.get('/lihat', isLoginSuperAdmin, viewOpini)
router.post('/tambah', isLoginSuperAdmin, upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'foto_penulis', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 }
]), addOpini)
router.put('/:id/edit', isLoginSuperAdmin, upload.fields([
    { name: 'surat_permohonan', maxCount: 1 },
    { name: 'foto_penulis', maxCount: 1 },
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 }
]), editOpini)
router.delete('/:id/delete', isLoginSuperAdmin, deleteOpini)

module.exports = router