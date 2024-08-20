// const Accounts = require('../models/tb_account');
// const Kegiatans = require('../models/tb_kegiatan');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  loadDataKegiatan: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Kegiatans.count();
      const totalPage = Math.ceil(totalRow / limit);

      // cek apakah role user
      var idRoleUser = req.user.dataValues.id_role;
      var dataKegiatan;
      if (idRoleUser == 1) {
        dataKegiatan = await Kegiatans.findAll({
          where: {
            id_account: req.user.dataValues.id,
          },
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        })
      } else {
        dataKegiatan = await Kegiatans.findAll({
          limit,
          offset,
          order: [['createdAt', 'DESC']],
        })
      }

      res.status(200).json({
        message: `Berhasil menampilkan ${dataKegiatan.length} data kegiatan tersimpan.`,
        page: page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: dataKegiatan,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message || 'Internal Server Error',
      });
    }
  },
  viewDataKegiatan: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Kegiatans.count();
      const totalPage = Math.ceil(totalRow / limit);
      const kegiatan = await Kegiatans.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json({
        message: `Berhasil menampilkan ${kegiatan.length} data kegiatan tersimpan.`,
        page: page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: kegiatan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneDataKegiatan: async (req, res) => {
    const { id } = req.params;
    try {
      const kegiatan = await Kegiatans.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        where: { id },
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json({
        message: `Berhasil menampilkan ${kegiatan.length} data kegiatan tersimpan.`,
        data: kegiatan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addDataKegiatan: async (req, res) => {
    try {
      const payload = req.body;

      const kegiatan = await Kegiatans.create(payload);
      if (req.files.surat_permohonan) {
        const { surat_permohonan } = req.files;
        kegiatan.surat_permohonan = surat_permohonan[0].filename;
      }
      if (req.files.sik) {
        const { sik } = req.files;
        kegiatan.sik = sik[0].filename;
      }
      await kegiatan.save();

      res.status(201).json({
        message: `Kegiatan '${payload.judul_kegiatan}' berhasil ditambahkan.`,
        data: kegiatan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editDataKegiatan: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const kegiatan = await Kegiatans.findByPk(id);
      if (kegiatan) {
        Object.assign(kegiatan, payload);
        if (req.files.surat_permohonan) {
          const { surat_permohonan } = req.files;
          if (kegiatan.surat_permohonan) {
            deleteFile(kegiatan.surat_permohonan);
          }
          kegiatan.surat_permohonan = surat_permohonan[0].filename;
        }
        if (req.files.sik) {
          const { sik } = req.files;
          if (kegiatan.sik) {
            deleteFile(kegiatan.sik);
          }
          kegiatan.sik = sik[0].filename;
        }
        await kegiatan.save();

        res.status(200).json({
          message: `Data berhasil diperbarui`,
          data: kegiatan,
        });
      } else {
        res.status(404).json({
          message: 'Data kegiatan tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deleteDataKegiatan: async (req, res) => {
    const { id } = req.params;
    try {
      const kegiatan = await Kegiatans.findByPk(id);

      if (kegiatan) {
        if (kegiatan.surat_permohonan) {
          deleteFile(kegiatan.surat_permohonan);
        }
        if (kegiatan.sik) {
          deleteFile(kegiatan.sik);
        }
        await kegiatan.destroy();

        res.status(200).json({
          message: `Kegiatan '${kegiatan.judul_kegiatan}' berhasil dihapus.`,
        });
      } else {
        res.status(404).json({
          message: 'Data kegiatan tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewDataKegiatanUser: async (req, res) => {
    const { id_account } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Kegiatans.count();
      const totalPage = Math.ceil(totalRow / limit);
      const kegiatan = await Kegiatans.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        where: { id_account },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });
      res.status(200).json({
        message: `Berhasil menampilkan ${kegiatan.length} data kegiatan tersimpan.`,
        page: page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: kegiatan,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
