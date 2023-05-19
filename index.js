require('dotenv').config()

const express = require('express')
const sequelize = require('./config/connection')
const app = express()
const port = process.env.PORT || 3030

app.get('/', async (req, res) => {
  // res.send('Hello World!')
  try {
    await sequelize.authenticate()
    res.send('Connection to database has been established successfully.')
  } catch (error) {
    res.send('Unable to connect to the database: ' + error.message)
  }
})

app.listen(port, () => {
  console.log(`\nSistem Informasi Manajemen Pelayanan dan Berita API's \nSuccessfully listening the app on http://localhost:${port}`)
})