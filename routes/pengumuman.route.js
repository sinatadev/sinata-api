var express = require('express');
var router = express.Router();

const {
	viewPengumuman,
	addPengumuman,
	editPengumuman,
	deletePengumuman,
	viewOnePengumuman,
} = require('../controllers/pengumuman.controller');
const { isLoginAdmin } = require('../middlewares/auth.middleware');

router.get('/', viewPengumuman);
router.get('/:id', viewOnePengumuman);
router.post('/tambah', isLoginAdmin, addPengumuman);
router.put('/:id/edit', isLoginAdmin, editPengumuman);
router.delete('/:id/delete', isLoginAdmin, deletePengumuman);

module.exports = router;
