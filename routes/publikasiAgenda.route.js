var express = require('express')
var router = express.Router()

const { viewAgenda } = require('../controllers/publikasiAgenda.controller')

router.get('/lihat-agenda', viewAgenda)

module.exports = router