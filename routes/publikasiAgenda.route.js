var express = require('express')
var router = express.Router()

const { viewAgenda, addAgenda, editAgenda, deleteAgenda } = require('../controllers/publikasiAgenda.controller')
const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')

router.get('/lihat', viewAgenda)
router.post('/tambah', isLoginSuperAdmin, addAgenda)
router.put('/:id/edit', isLoginSuperAdmin, editAgenda)
router.delete('/:id/delete', isLoginSuperAdmin, deleteAgenda)

module.exports = router