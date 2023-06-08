var express = require('express')
var router = express.Router()

const { viewAgenda, addAgenda, editAgenda, deleteAgenda } = require('../controllers/publikasiAgenda.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const upload = require('../utils/upload.util')

router.get('/lihat', viewAgenda)
router.post('/tambah', isLoginSuperAdmin, upload.single('leaflet_kegiatan'), addAgenda)
router.put('/:id/edit', isLoginSuperAdmin, upload.single('leaflet_kegiatan'), editAgenda)
router.delete('/:id/delete', isLoginSuperAdmin, deleteAgenda)

module.exports = router