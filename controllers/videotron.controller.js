const Videotrons = require('../models/tb_layvideotron');
const DataKegiatans = require('../models/tb_kegiatan');
const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewVideotron: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Videotrons.count();
      const totalPage = Math.ceil(totalRow / limit);
      const videotron = await Videotrons.findAll({
        include: {
          model: DataKegiatans,
          required: true,
          include: {
            model: Accounts,
            required: true,
          },
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedVideotron = videotron.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${videotron.length} Layanan Penayangan di Videotron`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedVideotron,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneVideotron: async (req, res) => {
    const { id } = req.params;
    try {
      const videotron = await Videotrons.findAll({
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

      const modifiedVideotron = videotron.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan Layanan Penayangan di Videotron`,
        data: modifiedVideotron,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addVideotron: async (req, res) => {
    const payload = req.body;
    try {
      const videotron = await Videotrons.create(payload);
      if (req.files.bahan_publikasi) {
        const { bahan_publikasi } = req.files;
        videotron.bahan_publikasi = bahan_publikasi[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        videotron.disposisi = disposisi[0].filename;
      }
      if (req.files.luaran_layanan) {
        const { luaran_layanan } = req.files;
        videotron.luaran_layanan = luaran_layanan[0].filename;
      }
      await videotron.save();

      res.status(201).json({
        message: `Layanan videotron baru berhasil ditambahkan.`,
        data: videotron,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editVideotron: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const videotron = await Videotrons.findByPk(id);
      if (videotron) {
        Object.assign(videotron, payload);
        if (req.files.bahan_publikasi) {
          const { bahan_publikasi } = req.files;
          if (videotron.bahan_publikasi) {
            deleteFile(videotron.bahan_publikasi);
          }
          videotron.bahan_publikasi = bahan_publikasi[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (videotron.disposisi) {
            deleteFile(videotron.disposisi);
          }
          videotron.disposisi = disposisi[0].filename;
        }
        if (req.files.luaran_layanan) {
          const { luaran_layanan } = req.files;
          if (videotron.luaran_layanan) {
            deleteFile(videotron.luaran_layanan);
          }
          videotron.luaran_layanan = luaran_layanan[0].filename;
        }
        await videotron.save();

        res.status(201).json({
          message: `Layanan videotron berhasil diubah.`,
          data: videotron,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan penayangan videotron tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deleteVideotron: async (req, res) => {
    const { id } = req.params;
    try {
      const videotron = await Videotrons.findByPk(id);
      if (videotron) {
        if (videotron.bahan_publikasi) {
          deleteFile(videotron.bahan_publikasi);
        }
        if (videotron.disposisi) {
          deleteFile(videotron.disposisi);
        }
        if (videotron.luaran_layanan) {
          deleteFile(videotron.luaran_layanan);
        }
        await videotron.destroy();

        res.status(200).json({
          message: `Layanan videotron berhasil dihapus.`,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan penayangan videotron tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewVideotronUser: async (req, res) => {
    const { id_account } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Videotrons.count();
      const totalPage = Math.ceil(totalRow / limit);
      const videotron = await Videotrons.findAll({
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

      const modifiedVideotron = videotron.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${videotron.length} Layanan Penayangan di Videotron`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedVideotron,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
