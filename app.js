require('dotenv').config()

const express = require('express')
const sequelize = require('./config/connection')
// const tb_account = require('./models/tb_account')

const authRouter = require('./routes/auth.route')
const accountsRouter = require('./routes/accounts.route')
const dataKegiatanRouter = require('./routes/dataKegiatan.route')
const publikasiAgenda = require('./routes/publikasiAgenda.route')
const { isLoginUser } = require('./middlewares/auth.middleware')

const app = express()
const port = process.env.PORT || 3030
const URL = '/api/v1'

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
app.use(`${URL}/publikasi-agenda`, publikasiAgenda)

app.get(`${URL}/checkLoginUser`, isLoginUser)

app.listen(port, () => {
    console.log(`\nSistem Informasi Manajemen Pelayanan dan Berita API's \nSuccessfully listening the app on http://localhost:${port}`)
})