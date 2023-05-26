require('dotenv').config()

const express = require('express')
const sequelize = require('./config/connection')
const tb_account = require('./models/tb_account')
const app = express()
const port = process.env.PORT || 3030

app.get('/', async (req, res) => {
  try {
    await sequelize.authenticate()
    res.send('Connection to database has been established successfully.')
  } catch (error) {
    res.send('Unable to connect to the database: ' + error.message)
  }
})

app.get('/accounts', async (req, res) => {
  try {
    const users = await tb_account.findAll()
    res.json(users);  
  } catch (error) {
    res.status(500).send('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`\nSistem Informasi Manajemen Pelayanan dan Berita API's \nSuccessfully listening the app on http://localhost:${port}`)
})