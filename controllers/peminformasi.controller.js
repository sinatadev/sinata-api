// const PembaruanInformasis = require('../models/tb_laypeminformasi');
// const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewPeminformasi: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await PembaruanInformasis.count();
      const totalPage = Math.ceil(totalRow / limit);
      const peminformasi = await PembaruanInformasis.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedPeminformasi = peminformasi.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${peminformasi.length} Layanan Pembaruan Informasi di Laman UNS`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedPeminformasi,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOnePeminformasi: async (req, res) => {
    const { id } = req.params;
    try {
      const peminformasi = await PembaruanInformasis.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        where: { id },
        order: [['createdAt', 'DESC']],
      });

      const modifiedPeminformasi = peminformasi.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan Layanan Pembaruan Informasi di Laman UNS`,
        data: modifiedPeminformasi,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addPeminformasi: async (req, res) => {
    const payload = req.body;
    try {
      const peminformasi = await PembaruanInformasis.create(payload);
      if (req.files.surat_permohonan) {
        const { surat_permohonan } = req.files;
        peminformasi.surat_permohonan = surat_permohonan[0].filename;
      }
      if (req.files.bahan_publikasi) {
        const { bahan_publikasi } = req.files;
        peminformasi.bahan_publikasi = bahan_publikasi[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        peminformasi.disposisi = disposisi[0].filename;
      }
      await peminformasi.save();

      res.status(201).json({
        message: `Layanan '${payload.judul_permohonan}' berhasil ditambahkan.`,
        data: peminformasi,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editPeminformasi: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const peminformasi = await PembaruanInformasis.findByPk(id);
      if (peminformasi) {
        Object.assign(peminformasi, payload);
        if (req.files.surat_permohonan) {
          const { surat_permohonan } = req.files;
          if (peminformasi.surat_permohonan) {
            deleteFile(peminformasi.surat_permohonan);
          }
          peminformasi.surat_permohonan = surat_permohonan[0].filename;
        }
        if (req.files.bahan_publikasi) {
          const { bahan_publikasi } = req.files;
          if (peminformasi.bahan_publikasi) {
            deleteFile(peminformasi.bahan_publikasi);
          }
          peminformasi.bahan_publikasi = bahan_publikasi[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (peminformasi.disposisi) {
            deleteFile(peminformasi.disposisi);
          }
          peminformasi.disposisi = disposisi[0].filename;
        }
        await peminformasi.save();

        res.status(200).json({
          message: `Layanan berhasil diperbarui`,
          data: peminformasi,
        });
      } else {
        res.status(404).json({
          message: 'Data permbaruan informasi di laman tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deletePemInformasi: async (req, res) => {
    const { id } = req.params;
    try {
      const peminformasi = await PembaruanInformasis.findByPk(id);
      if (peminformasi) {
        if (peminformasi.surat_permohonan) {
          deleteFile(peminformasi.surat_permohonan);
        }
        if (peminformasi.bahan_publikasi) {
          deleteFile(peminformasi.bahan_publikasi);
        }
        if (peminformasi.disposisi) {
          deleteFile(peminformasi.disposisi);
        }
        await peminformasi.destroy();

        res.status(200).json({
          message: `Data '${peminformasi.judul_permohonan}' berhasil dihapus`,
        });
      } else {
        res.status(404).json({
          message: 'Data permbaruan informasi di laman tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewPeminformasiUser: async (req, res) => {
    const { id_account } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await PembaruanInformasis.count();
      const totalPage = Math.ceil(totalRow / limit);
      const peminformasi = await PembaruanInformasis.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        where: { id_account },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedPeminformasi = peminformasi.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${peminformasi.length} Layanan Pembaruan Informasi di Laman UNS`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedPeminformasi,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
