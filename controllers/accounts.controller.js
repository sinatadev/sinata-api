const { tbl_user } = require('../models');
const deleteFile = require('../utils/deleteFIle.util');
const { hashPassword, compareSyncPassword } = require('../utils/password.util');
const { Op } = require('sequelize');

module.exports = {
	viewUsers: async (req, res) => {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;
		const role = req.query.role || null;
		try {
			let where = {};
			if (role) {
				where = { role };
			}
			const totalRow = await tbl_user.count();
			const totalPage = Math.ceil(totalRow / limit);

			const users = await tbl_user.findAll({
				offset: offset,
				limit: limit,
				where,
				order: [['createdAt', 'DESC']],
			});

			const modifiedUsers = users.map((item) => {
				const modifiedItem = { ...item.toJSON() };
				modifiedItem.password = undefined;
				return modifiedItem;
			});

			res.status(200).json({
				message: `Berhasil menampilkan ${users.length} pengguna terdaftar.`,
				page,
				totalPage,
				totalRow,
				rowsPerPage: limit,
				data: modifiedUsers,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
				error: error.message,
			});
		}
	},
	addUsers: async (req, res) => {
		try {
			const { username, email, name, password, ...payload } = req.body;

			const checkEmail = await Accounts.findOne({ where: { email: email } });
			const checkUsername = await Accounts.findOne({
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

				const newUser = await Accounts.create({
					username,
					email,
					name,
					password: hashedPassword,
					...payload,
				});
				await newUser.save();

				delete newUser.dataValues.password;

				res.status(201).json({
					message: 'Akun baru berhasil ditambahkan',
					data: newUser,
				});
			}
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	editUser: async (req, res) => {
		const { id } = req.params;
		const { username, email, ...payload } = req.body;

		try {
			const user = await Accounts.findByPk(id);
			if (user) {
				if (user.username === username && user.email === email) {
					Object.assign(user, payload);
					await user.save();
					delete user.dataValues.password;

					res.status(200).json({
						message: `Akun ${user.username} berhasil diperbarui`,
						data: user,
					});
				} else {
					const existingUser = await Accounts.findOne({
						where: {
							[Op.or]: [{ username: username }, { email: email }],
							id: { [Op.not]: id },
						},
					});

					if (existingUser) {
						res.status(400).json({
							message: 'Username atau email sudah terdaftar',
						});
					} else {
						Object.assign(user, { username, email }, payload);
						await user.save();
						delete user.dataValues.password;

						res.status(200).json({
							message: `Akun ${user.username} berhasil diperbarui`,
							data: user,
						});
					}
				}
			} else {
				res.status(404).json({
					message: 'User tidak ditemukan.',
				});
			}
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	deleteUser: async (req, res) => {
		const { id } = req.params;
		try {
			const user = await Accounts.findByPk(id);

			if (!user) {
				res.status(404).json({
					message: 'Akun tidak ditemukan.',
				});
			}
			if (user.img_profil) {
				deleteFile(user.img_profil);
			}
			await user.destroy();

			res.status(200).json({
				message: `Akun ${user.username} telah berhasil dihapus.`,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	changeAvatar: async (req, res) => {
		const { id } = req.params;
		try {
			const user = await Accounts.findByPk(id);
			if (!user) {
				return res.status(404).json({
					message: 'Akun tidak ditemukan.',
				});
			}
			// user.img_profil = req.files.img_profil;
			if (req.files.img_profil) {
				const { img_profil } = req.files;
				if (user.img_profil && user.img_profil !== 'default.jpeg') {
					deleteFile(user.img_profil);
				}
				user.img_profil = img_profil[0].filename;
			}
			await user.save();

			res.status(200).json({
				message: `Berhasil mengubah avatar profil '${user.username}'.`,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	changeProfile: async (req, res) => {
		const { id } = req.params;
		const { email, ...payload } = req.body;
		try {
			const user = await Accounts.findByPk(id);
			if (user) {
				if (user.email === email) {
					Object.assign(user, payload);
					await user.save();
					delete user.dataValues.password;

					res.status(200).json({
						message: `Akun ${user.username} berhasil diperbarui`,
						data: user,
					});
				} else {
					const existingUser = await Accounts.findOne({
						where: {
							[Op.or]: [{ email: email }],
							id: { [Op.not]: id },
						},
					});

					if (existingUser) {
						res.status(400).json({
							message: 'Alamat email sudah terdaftar',
						});
					} else {
						Object.assign(user, { email }, payload);
						await user.save();
						delete user.dataValues.password;

						res.status(200).json({
							message: `Akun berhasil diperbarui`,
							data: user,
						});
					}
				}
			} else {
				res.status(404).json({
					message: 'User tidak ditemukan.',
				});
			}
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	changePassword: async (req, res) => {
		const { id } = req.params;
		const { old_password, new_password, confirm_password } = req.body;
		try {
			const user = await Accounts.findByPk(id);
			if (!user) {
				res.status(404).json({
					message: 'Akun tidak ditemukan.',
				});
			} else {
				const isMatch = compareSyncPassword(old_password, user.password);
				if (!isMatch) {
					res.status(400).json({
						message: 'Kata sandi lama tidak sesuai.',
					});
				} else if (new_password !== confirm_password) {
					res.status(400).json({
						message: 'Konfirmasi kata sandi baru tidak sesuai.',
					});
				} else {
					const hashedPassword = await hashPassword(new_password);
					user.password = hashedPassword;
					await user.save();

					res.status(200).json({
						message: 'Kata sandi berhasil diubah.',
					});
				}
			}
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
};
