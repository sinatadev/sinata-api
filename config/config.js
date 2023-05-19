require('dotenv').config()

const { Sequelize } = require('sequelize')
const database = process.env.DB_NAME
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

const sequelize = new Sequelize({
    database, username, password,
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

module.exports = sequelize