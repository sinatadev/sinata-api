const Accounts = require('../models/tb_account')
const jwt = require('jsonwebtoken')
const { hashPassword, compareSyncPassword } = require('../utils/password.util')
const { jwtKey } = require('../config/config')

module.exports = {
    signup: async(req, res) => {
        try {
            const { username, name, email, password } = req.body

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
                    name, 
                    email, 
                    password:hashedPassword
                })
                await newUser.save()
    
                delete newUser.dataValues.password
    
                res.status(201).json({
                    message: 'Akun berhasil di daftarkan',
                    data: newUser
                })
            }

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    },
    signin: async (req, res) => {
        try {
            const { email, password } = req.body

            await Accounts.findOne({ where: { email: email }}).then((user) =>{
                if(user) {
                    const checkPassword = compareSyncPassword(password, user.password)
                    if(checkPassword) {
                        const token = jwt.sign({
                            account: {
                                id: user.id,
                                username: user.username,
                                name: user.name,
                                email: user.email,
                                unit: user.unit,
                                role: user.role,
                                img_profil: user.img_profil
                            }
                        }, jwtKey)
                        
                        res.status(200).json({
                            message: 'Berhasil login',
                            token: token
                        })
                    } else {
                        res.status(403).json({
                            message: 'Kata Sandi yang Anda masukkan salah.'
                        })
                    }
                } else {
                    res.status(403).json({
                        message: 'Alamat Email yang Anda masukkan belum terdaftar.'
                    })
                }
            })

        } catch (error) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }
}