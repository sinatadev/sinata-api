var express = require('express')
var router = express.Router()

const { viewPengumuman, addPengumuman, editPengumuman, deletePengumuman, viewOnePengumuman } = require('../controllers/pengumuman.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')

router.get('/', viewPengumuman)
router.get('/:id', viewOnePengumuman)
router.post('/tambah', isLoginSuperAdmin, addPengumuman)
router.put('/:id/edit', isLoginSuperAdmin, editPengumuman)
router.delete('/:id/delete', isLoginSuperAdmin, deletePengumuman)

module.exports = router