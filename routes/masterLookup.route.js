const express = require('express');
const {isLogin} = require("../middlewares/auth.middleware");
const {loadData, createLookup, editLookup, deleteLookup} = require("../controllers/masterLookup.controller");
const router = express.Router();

// define routes
router.get('/load-data', isLogin, loadData)
router.post('/create', isLogin, createLookup)
router.put('/update', isLogin, editLookup)
router.delete('/delete', isLogin, deleteLookup)

module.exports = router