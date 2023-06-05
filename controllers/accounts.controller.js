const Accounts = require('../models/tb_account')
const { hashPassword } = require('../utils/password.util')
const { Op } = require('sequelize')

module.exports = {
    viewUsers: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5
            const users = await Accounts.findAll({ limit: limit })

            res.status(200).json({
                message: `Berhasil menampilkan ${limit} pengguna terdaftar.`,
                data: users
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addUsers: async (req, res) => {
        try {
            const { username, email, name, password, ...payload } = req.body

            const checkEmail = await Accounts.findOne({ where: { email: email }})
            const checkUsername = await Accounts.findOne({ where: { username: username }})

            if(checkEmail && !checkUsername || checkEmail && checkUsername){
                res.status(409).json({
                    message: 'Email yang Anda masukkan sudah terdaftar.'
                })
            }
            
            if(checkUsername && !checkEmail){
                res.status(409).json({
                    message: 'Username yang Anda masukkan sudah terdaftar.'
                })
            }

            if(!checkEmail && !checkUsername) {
                const hashedPassword = await hashPassword(password)
                
                const newUser = await Accounts.create({
                    username, 
                    email, 
                    name, 
                    password:hashedPassword, 
                    ...payload
                })
                await newUser.save()
    
                delete newUser.dataValues.password
    
                res.status(201).json({
                    message: 'Akun baru berhasil ditambahkan',
                    data: newUser
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editUser: async (req, res) => {
        const { id } = req.params
        const { username, email, ...payload } = req.body

        try {
            const user = await Accounts.findByPk(id)
            if(user){
                if(user.username === username && user.email === email) {
                    Object.assign(user, payload)
                    await user.save()
                    delete user.dataValues.password

                    res.status(201).json({
                        message: `Akun ${user.username} berhasil diperbarui`,
                        data: user
                    })
                } else {
                    const existingUser = await Accounts.findOne({
                        where: {
                            [Op.or]: [{ username: username }, { email: email }],
                            id: { [Op.not]: id }
                        }
                    })

                    if(existingUser) {
                        res.status(400).json({
                            message: 'Username atau email sudah terdaftar'
                        })
                    } else {
                        Object.assign(user, { username, email }, payload)
                        await user.save()
                        delete user.dataValues.password

                        res.status(201).json({
                            message: `Akun ${user.username} berhasil diperbarui`,
                            data: user
                        })
                    }
                }
            } else {
                res.status(404).json({
                    message: 'User tidak ditemukan.'
                })
            }    
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteUser: async(req, res) => {
        try {
            const { id } = req.params
            
            const user = await Accounts.findByPk(id)

            if(user) {
                await user.destroy()

                res.status(200).json({
                    message: `Akun ${user.username} telah berhasil dihapus.`
                })
            } else {
                res.status(404).json({
                    message: 'Akun tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}