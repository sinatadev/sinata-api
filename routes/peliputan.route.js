var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewPeliputan, addPeliputan, editPeliputan, deletePeliputan } = require('../controllers/peliputan.controller')
const upload = require('../utils/upload.util')

router.get('/lihat', isLoginSuperAdmin, viewPeliputan)
router.post('/tambah', isLoginSuperAdmin, upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 }
]), addPeliputan)
router.put('/:id/edit', isLoginSuperAdmin, upload.fields([
    { name: 'leaflet_kegiatan', maxCount: 1 },
    { name: 'disposisi', maxCount: 1 }
]), editPeliputan)
router.delete('/:id/delete', isLoginSuperAdmin, deletePeliputan)

module.exports = router