const express = require('express');
const router = express.Router();

const {
    loadData, create, edit, deleteRole
} = require('../controllers/masterRole.controller');
const { isLogin } = require("../middlewares/auth.middleware");

// define routes
router.get('/load-data', isLogin, loadData)
router.post('/create', isLogin, create)
router.put('/update', isLogin, edit)
router.delete('/delete', isLogin, deleteRole)

// export
module.exports = router