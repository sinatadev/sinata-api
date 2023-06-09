var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewVideotron, addVideotron, editVideotron, deleteVideotron } = require('../controllers/videotron.controller')
const upload = require('../utils/upload.util')

router.get('/lihat', isLoginSuperAdmin, viewVideotron)
router.post('/tambah', isLoginSuperAdmin, upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
]), addVideotron)
router.put('/:id/edit', isLoginSuperAdmin, upload.fields([
    { name: 'bahan_publikasi', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 },
    { name: 'luaran_layanan', maxCount: 1 },
]), editVideotron)
router.delete('/:id/delete', isLoginSuperAdmin, deleteVideotron)

module.exports = router