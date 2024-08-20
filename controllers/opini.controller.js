// const Opinis = require('../models/tb_opini');
// const Account = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewOpini: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Opinis.count();
      const totalPage = Math.ceil(totalRow / limit);
      const opini = await Opinis.findAll({
        include: {
          model: Account,
          required: true,
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedOpini = opini.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${opini.length} Data Opini`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedOpini,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneOpini: async (req, res) => {
    const { id } = req.params;
    try {
      const opini = await Opinis.findAll({
        include: {
          model: Account,
          required: true,
        },
        where: { id },
        order: [['createdAt', 'DESC']],
      });

      const modifiedOpini = opini.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan Data Layanan Opini`,
        data: modifiedOpini,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addOpini: async (req, res) => {
    const payload = req.body;
    try {
      const opini = await Opinis.create(payload);
      if (req.files.surat_permohonan) {
        const { surat_permohonan } = req.files;
        opini.surat_permohonan = surat_permohonan[0].filename;
      }
      if (req.files.foto_penulis) {
        const { foto_penulis } = req.files;
        opini.foto_penulis = foto_penulis[0].filename;
      }
      if (req.files.bahan_publikasi) {
        const { bahan_publikasi } = req.files;
        opini.bahan_publikasi = bahan_publikasi[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        opini.disposisi = disposisi[0].filename;
      }
      await opini.save();

      res.status(201).json({
        message: `Opini '${payload.judul_pembahasan}' berhasil ditambahkan.`,
        data: opini,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editOpini: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const opini = await Opinis.findByPk(id);
      if (opini) {
        Object.assign(opini, payload);
        if (req.files.surat_permohonan) {
          const { surat_permohonan } = req.files;
          if (opini.surat_permohonan) {
            deleteFile(opini.surat_permohonan);
          }
          opini.surat_permohonan = surat_permohonan[0].filename;
        }
        if (req.files.foto_penulis) {
          const { foto_penulis } = req.files;
          if (opini.foto_penulis) {
            deleteFile(opini.foto_penulis);
          }
          opini.foto_penulis = foto_penulis[0].filename;
        }
        if (req.files.bahan_publikasi) {
          const { bahan_publikasi } = req.files;
          if (opini.bahan_publikasi) {
            deleteFile(opini.bahan_publikasi);
          }
          opini.bahan_publikasi = bahan_publikasi[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (opini.disposisi) {
            deleteFile(opini.disposisi);
          }
          opini.disposisi = disposisi[0].filename;
        }
        await opini.save();

        res.status(200).json({
          message: `Opini berhasil diubah.`,
          data: opini,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan opini tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deleteOpini: async (req, res) => {
    const { id } = req.params;
    try {
      const opini = await Opinis.findByPk(id);
      if (opini) {
        if (opini.surat_permohonan) {
          deleteFile(opini.surat_permohonan);
        }
        if (opini.foto_penulis) {
          deleteFile(opini.foto_penulis);
        }
        if (opini.bahan_publikasi) {
          deleteFile(opini.bahan_publikasi);
        }
        if (opini.disposisi) {
          deleteFile(opini.disposisi);
        }
        await opini.destroy();

        res.status(200).json({
          message: `Data layanan opini ${opini.judul_pembahasan} berhasil dihapus`,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan opini tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOpiniUser: async (req, res) => {
    const { id_account } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Opinis.count();
      const totalPage = Math.ceil(totalRow / limit);
      const opini = await Opinis.findAll({
        include: {
          model: Account,
          required: true,
        },
        where: { id_account },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedOpini = opini.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${opini.length} Data Opini`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedOpini,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
