const jwt = require('jsonwebtoken')
const { jwtKey } = require('../config/config')
const Accounts = require('../models/tb_account')

module.exports={
    isLoginUser: async(req, res, next) => {
        try {
            const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;
            
            const data = jwt.verify(token, jwtKey)
    
            const user = await Accounts.findOne({ where: { id: data.account.id}})

            if(user.role !== 'User') {
                throw new Error()
            }

            req.account = user
            req.token = token
            // res.json(token)
            next()
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                res.status(401).json({
                    message: 'Maaf sesi Anda telah habis, silakan login kembali.'
                })
            } else {
                res.status(401).json({
                    message: 'Akun Anda tidak diijinkan untuk mengakses halaman ini.'
                })    
            }
        }
    }
}