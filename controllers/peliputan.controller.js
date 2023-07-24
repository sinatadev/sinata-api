const Peliputans = require('../models/tb_laypeliputan');
const DataKegiatans = require('../models/tb_kegiatan');
const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
	viewPeliputan: async (req, res) => {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;
		const tgl_kegiatan = req.query.tgl || null;
		try {
			let where = {};
			if (tgl_kegiatan) {
				where = { tgl_kegiatan };
			}

			const totalRow = await Peliputans.count();
			const totalPage = Math.ceil(totalRow / limit);
			const peliputan = await Peliputans.findAll({
				include: {
					model: DataKegiatans,
					required: true,
					where,
					include: {
						model: Accounts,
						required: true,
					},
				},
				limit,
				offset,
				order: [['createdAt', 'DESC']],
			});

			const modifiedPeliputan = peliputan.map((item) => {
				const modifiedItem = { ...item.toJSON() };
				modifiedItem.tb_kegiatan.tb_account.password = undefined;
				return modifiedItem;
			});

			res.status(200).json({
				message: `Berhasil menampilkan ${peliputan.length} Layanan Peliputan`,
				page,
				totalPage,
				totalRow,
				rowsPerPage: limit,
				data: modifiedPeliputan,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	viewOnePeliputan: async (req, res) => {
		const { id } = req.params;
		try {
			const peliputan = await Peliputans.findAll({
				include: {
					model: DataKegiatans,
					required: true,
					include: {
						model: Accounts,
						required: true,
					},
				},
				where: { id },
				order: [['createdAt', 'DESC']],
			});

			const modifiedPeliputan = peliputan.map((item) => {
				const modifiedItem = { ...item.toJSON() };
				modifiedItem.tb_kegiatan.tb_account.password = undefined;
				return modifiedItem;
			});

			res.status(200).json({
				message: `Berhasil menampilkan ${peliputan.length} Layanan Peliputan`,
				data: modifiedPeliputan,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	addPeliputan: async (req, res) => {
		const payload = req.body;
		try {
			const peliputan = await Peliputans.create(payload);
			if (req.files.leaflet_kegiatan) {
				const { leaflet_kegiatan } = req.files;
				peliputan.leaflet_kegiatan = leaflet_kegiatan[0].filename;
			}
			if (req.files.disposisi) {
				const { disposisi } = req.files;
				peliputan.disposisi = disposisi[0].filename;
			}
			await peliputan.save();

			res.status(201).json({
				message: `Layanan peliputan baru berhasil ditambahkan.`,
				data: peliputan,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	editPeliputan: async (req, res) => {
		const { id } = req.params;
		const payload = req.body;
		try {
			const peliputan = await Peliputans.findByPk(id);
			if (peliputan) {
				Object.assign(peliputan, payload);
				if (req.files.leaflet_kegiatan) {
					const { leaflet_kegiatan } = req.files;
					if (peliputan.leaflet_kegiatan) {
						deleteFile(peliputan.leaflet_kegiatan);
					}
					peliputan.leaflet_kegiatan = leaflet_kegiatan[0].filename;
				}
				if (req.files.disposisi) {
					const { disposisi } = req.files;
					if (peliputan.disposisi) {
						deleteFile(peliputan.disposisi);
					}
					peliputan.disposisi = disposisi[0].filename;
				}
				await peliputan.save();

				res.status(200).json({
					message: `Layanan peliputan berhasil diubah.`,
					data: peliputan,
				});
			} else {
				res.status(404).json({
					message: 'Data layanan peliputan tidak ditemukan.',
				});
			}
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	deletePeliputan: async (req, res) => {
		const { id } = req.params;
		try {
			const peliputan = await Peliputans.findByPk(id);
			if (peliputan) {
				if (peliputan.leaflet_kegiatan) {
					deleteFile(peliputan.leaflet_kegiatan);
				}
				if (peliputan.disposisi) {
					deleteFile(peliputan.disposisi);
				}
				await peliputan.destroy();

				res.status(200).json({
					message: `Layanan peliputan berhasil dihapus.`,
				});
			} else {
				res.status(404).json({
					message: 'Data layanan peliputan tidak ditemukan.',
				});
			}
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
	viewPeliputanUser: async (req, res) => {
		const { id_account } = req.params;
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const offset = (page - 1) * limit;
		try {
			const totalRow = await Peliputans.count();
			const totalPage = Math.ceil(totalRow / limit);
			const peliputan = await Peliputans.findAll({
				include: {
					model: DataKegiatans,
					required: true,
					where: { id_account },
					include: {
						model: Accounts,
						required: true,
					},
				},
				limit,
				offset,
				order: [['createdAt', 'DESC']],
			});

			const modifiedPeliputan = peliputan.map((item) => {
				const modifiedItem = { ...item.toJSON() };
				modifiedItem.tb_kegiatan.tb_account.password = undefined;
				return modifiedItem;
			});

			res.status(200).json({
				message: `Berhasil menampilkan ${peliputan.length} Layanan Peliputan`,
				page,
				totalPage,
				totalRow,
				rowsPerPage: limit,
				data: modifiedPeliputan,
			});
		} catch (error) {
			res.status(500).json({
				message: error.message || 'Internal Server Error',
			});
		}
	},
};
