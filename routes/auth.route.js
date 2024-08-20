var express = require('express')
var router = express.Router()

const { signup, signin, checkAccess} = require('../controllers/auth.controller')
const {isLogin} = require("../middlewares/auth.middleware");

router.post('/sign-up', signup)
router.post('/sign-in', signin)
router.post('/check-access', isLogin, checkAccess)

module.exports = router