require('dotenv').config()

var express = require('express')
var sequelize = require('./config/connection')
var cors = require('cors')

const authRouter = require('./routes/auth.route')
const accountsRouter = require('./routes/accounts.route')
const dataKegiatanRouter = require('./routes/dataKegiatan.route')
const publikasiAgendaRouter = require('./routes/publikasiAgenda.route')
const konpersRouter = require('./routes/konpers.route')
const peminformasiRouter = require('./routes/peminformasi.route')
const arsipDesainRouter = require('./routes/arsipDesain.route')
const opiniRouter = require('./routes/opini.route')
const balihoRouter = require('./routes/baliho.route')
const videotronRouter = require('./routes/videotron.route')
const liveStreamingRouter = require('./routes/livestreaming.route')
const majalahRouter = require('./routes/majalah.route')
const peliputanRouter = require('./routes/peliputan.route')
const arsipPersRouter = require('./routes/arsipPers.route')
const dokumentasiRouter = require('./routes/dokumentasi.route')
const filedocRouter = require('./routes/filedoc.route')

const app = express()
const port = process.env.PORT || 3030
const URL = '/api/v1'

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate()
        res.status(200).send('Connection to database has been established successfully.')
    } catch (error) {
        res.status(500).json('Unable to connect to the database: ' + error.message)
    }
})

app.use(`${URL}/auth`, authRouter)
app.use(`${URL}/users`, accountsRouter)
app.use(`${URL}/data-kegiatan`, dataKegiatanRouter)
app.use(`${URL}/publikasi-agenda`, publikasiAgendaRouter)
app.use(`${URL}/konpers`, konpersRouter)
app.use(`${URL}/pembaruan-informasi`, peminformasiRouter)
app.use(`${URL}/arsip-desain`, arsipDesainRouter)
app.use(`${URL}/opini`, opiniRouter)
app.use(`${URL}/baliho`, balihoRouter)
app.use(`${URL}/videotron`, videotronRouter)
app.use(`${URL}/live-streaming`, liveStreamingRouter)
app.use(`${URL}/majalah`, majalahRouter)
app.use(`${URL}/peliputan`, peliputanRouter)
app.use(`${URL}/arsip-pers`, arsipPersRouter)
app.use(`${URL}/dokumentasi`, dokumentasiRouter)
app.use(`${URL}/file-doc`, filedocRouter)

app.listen(port, () => {
    console.log(`\nSistem Informasi Manajemen Pelayanan dan Berita API's \nSuccessfully listening the app on http://localhost:${port}`)
})