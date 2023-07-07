const jwt = require('jsonwebtoken');
const { jwtKey } = require('../config/config');
const Accounts = require('../models/tb_account');
module.exports = {
  isLogin: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;
      if (!token) {
        return res.status(401).json({
          message: 'Maaf token tidak ditemukan.',
        });
      }

      const data = jwt.verify(token, jwtKey);

      const user = await Accounts.findOne({ where: { id: data.account.id } });
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          message: 'Token tidak valid.',
        });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: 'Maaf sesi Anda telah habis, silakan login kembali.',
        });
      } else {
        return res.status(401).json({
          message: 'Akun Anda tidak diijinkan untuk mengakses halaman ini.',
        });
      }
    }
  },
  isLoginUser: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;
      if (!token) {
        return res.status(401).json({
          message: 'Maaf token tidak ditemukan.',
        });
      }

      const data = jwt.verify(token, jwtKey);

      const user = await Accounts.findOne({ where: { id: data.account.id } });
      if (user.role !== 'User') {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          message: 'Token tidak valid.',
        });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: 'Maaf sesi Anda telah habis, silakan login kembali.',
        });
      } else {
        return res.status(401).json({
          message: 'Akun Anda tidak diijinkan untuk mengakses halaman ini.',
        });
      }
    }
  },
  isLoginSuperAdmin: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace('Bearer ', '')
        : null;
      if (!token) {
        return res.status(401).json({
          message: 'Maaf token tidak ditemukan.',
        });
      }

      const data = jwt.verify(token, jwtKey);

      const user = await Accounts.findOne({ where: { id: data.account.id } });
      if (user.role !== 'Super Admin') {
        throw new Error();
      }
      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({
          message: 'Token tidak valid.',
        });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          message: 'Maaf sesi Anda telah habis, silakan login kembali.',
        });
      } else {
        return res.status(401).json({
          message: 'Akun Anda tidak diijinkan untuk mengakses halaman ini.',
        });
      }
    }
  },
};
