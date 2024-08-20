const { tbl_user } = require('../models');
// const NavigationAssignments = require('../models/tb_navigation_assignment');
const jwt = require('jsonwebtoken');
const { hashPassword, compareSyncPassword } = require('../utils/password.util');
const { jwtKey } = require('../config/config');

module.exports = {
  signup: async (req, res) => {
    try {
      const { username, name, email, password, roleId } = req.body;

      const checkEmail = await tbl_user.findOne({ where: { email: email } });
      const checkUsername = await tbl_user.findOne({
        where: { username: username },
      });

      if ((checkEmail && !checkUsername) || (checkEmail && checkUsername)) {
        res.status(409).json({
          message: 'Email yang Anda masukkan sudah terdaftar.',
        });
      }

      if (checkUsername && !checkEmail) {
        res.status(409).json({
          message: 'Username yang Anda masukkan sudah terdaftar.',
        });
      }

      if (!checkEmail && !checkUsername) {
        const hashedPassword = await hashPassword(password);

        const newUser = await tbl_user.create({
          username,
          name,
          email,
          roleId,
          password: hashedPassword,
        });
        await newUser.save();

        delete newUser.dataValues.password;

        res.status(201).json({
          message: 'Akun berhasil di daftarkan',
          data: newUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      await tbl_user.findOne({ where: { email: email } }).then((user) => {
        if (user) {
          const checkPassword = compareSyncPassword(password, user.password);
          if (checkPassword) {
            const token = jwt.sign(
              {
                account: {
                  id: user.id,
                  username: user.username,
                  roleId: user.roleId,
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                },
              },
              jwtKey,
              { expiresIn: '24h' },
            );

            res.status(200).json({
              message: 'Berhasil login',
              data: token,
            });
          } else {
            res.status(403).json({
              message: 'Kata Sandi yang Anda masukkan salah.',
            });
          }
        } else {
          res.status(403).json({
            message: 'Alamat Email yang Anda masukkan belum terdaftar.',
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  },
  checkAccess: async (req, res) => {
    const { url } = req.body;
    var id_role = req.user.dataValues.id_role;

    var count = await NavigationAssignments.count({
      where: {
        url: url,
        id_role: id_role
      }
    });

    if (count < 0) {
      res.status(403).json({
        error: true,
        message: 'User does not have access'
      })
    } else {
      res.status(200).json({
        error: false,
        message: 'User allowed'
      })
    }
  }
};
