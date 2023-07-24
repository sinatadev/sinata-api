var express = require('express');
var router = express.Router();

const { isLoginAdmin } = require('../middlewares/auth.middleware');
const {
	viewFileDoc,
	deleteFileDoc,
} = require('../controllers/filedoc.controller');

router.get('/:id/lihat', isLoginAdmin, viewFileDoc);
router.delete('/:id/delete', isLoginAdmin, deleteFileDoc);

module.exports = router;
