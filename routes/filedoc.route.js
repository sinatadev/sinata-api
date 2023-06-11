var express = require('express')
var router = express.Router()

const { isLoginSuperAdmin } = require('../middlewares/auth.middleware')
const { viewFileDoc, deleteFileDoc } = require('../controllers/filedoc.controller')

router.get('/:id/lihat', isLoginSuperAdmin, viewFileDoc)
router.delete('/:id/delete', isLoginSuperAdmin, deleteFileDoc)

module.exports = router