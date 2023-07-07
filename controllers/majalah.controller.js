const Majalahs = require('../models/tb_laymajalah');
const DataKegiatans = require('../models/tb_kegiatan');
const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewMajalah: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Majalahs.count();
      const totalPage = Math.ceil(totalRow / limit);
      const majalah = await Majalahs.findAll({
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

      const modifiedMajalah = majalah.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${majalah.length} Layanan Publikasi di Majalah`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedMajalah,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneMajalah: async (req, res) => {
    const { id } = req.params;
    try {
      const majalah = await Majalahs.findAll({
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

      const modifiedMajalah = majalah.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan Layanan Publikasi di Majalah`,
        data: modifiedMajalah,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addMajalah: async (req, res) => {
    const payload = req.body;
    try {
      const majalah = await Majalahs.create(payload);
      if (req.files.bahan_publikasi) {
        const { bahan_publikasi } = req.files;
        majalah.bahan_publikasi = bahan_publikasi[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        majalah.disposisi = disposisi[0].filename;
      }
      if (req.files.luaran_layanan) {
        const { luaran_layanan } = req.files;
        majalah.luaran_layanan = luaran_layanan[0].filename;
      }
      await majalah.save();

      res.status(201).json({
        message: `Layanan publikasi di majalah baru berhasil ditambahkan.`,
        data: majalah,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editMajalah: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const majalah = await Majalahs.findByPk(id);
      if (majalah) {
        Object.assign(majalah, payload);
        if (req.files.bahan_publikasi) {
          const { bahan_publikasi } = req.files;
          if (majalah.bahan_publikasi) {
            deleteFile(majalah.bahan_publikasi);
          }
          majalah.bahan_publikasi = bahan_publikasi[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (majalah.disposisi) {
            deleteFile(majalah.disposisi);
          }
          majalah.disposisi = disposisi[0].filename;
        }
        if (req.files.luaran_layanan) {
          const { luaran_layanan } = req.files;
          if (majalah.luaran_layanan) {
            deleteFile(majalah.luaran_layanan);
          }
          majalah.luaran_layanan = luaran_layanan[0].filename;
        }
        await majalah.save();

        res.status(200).json({
          message: `Layanan publikasi di majalah berhasil diubah.`,
          data: majalah,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan publikasi di majalah tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deleteMajalah: async (req, res) => {
    const { id } = req.params;
    try {
      const majalah = await Majalahs.findByPk(id);
      if (majalah) {
        if (majalah.bahan_publikasi) {
          deleteFile(majalah.bahan_publikasi);
        }
        if (majalah.disposisi) {
          deleteFile(majalah.disposisi);
        }
        if (majalah.luaran_layanan) {
          deleteFile(majalah.luaran_layanan);
        }
        await majalah.destroy();

        res.status(200).json({
          message: `Layanan publikasi di majalah berhasil dihapus.`,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan publikasi di majalah tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
