// const Konpers = require('../models/tb_laykonpers');
// const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewKonpers: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Konpers.count();
      const totalPage = Math.ceil(totalRow / limit);
      const konpers = await Konpers.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedKonpers = konpers.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${konpers.length} Layanan Konferensi Pers`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedKonpers,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneKonpers: async (req, res) => {
    const { id } = req.params;
    try {
      const konpers = await Konpers.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        where: { id },
        order: [['createdAt', 'DESC']],
      });

      const modifiedKonpers = konpers.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan Layanan Konferensi Pers`,
        data: modifiedKonpers,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addKonpers: async (req, res) => {
    const payload = req.body;
    try {
      const konpers = await Konpers.create(payload);
      if (req.files.surat_permohonan) {
        const { surat_permohonan } = req.files;
        konpers.surat_permohonan = surat_permohonan[0].filename;
      }
      if (req.files.leaflet_kegiatan) {
        const { leaflet_kegiatan } = req.files;
        konpers.leaflet_kegiatan = leaflet_kegiatan[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        konpers.disposisi = disposisi[0].filename;
      }
      await konpers.save();

      res.status(201).json({
        message: `Konferensi Pers '${payload.judul_kegiatan}' berhasil ditambahkan.`,
        data: konpers,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editKonpers: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const konpers = await Konpers.findByPk(id);
      if (konpers) {
        Object.assign(konpers, payload);
        if (req.files.surat_permohonan) {
          const { surat_permohonan } = req.files;
          if (konpers.surat_permohonan) {
            deleteFile(konpers.surat_permohonan);
          }
          konpers.surat_permohonan = surat_permohonan[0].filename;
        }
        if (req.files.leaflet_kegiatan) {
          const { leaflet_kegiatan } = req.files;
          if (konpers.leaflet_kegiatan) {
            deleteFile(konpers.leaflet_kegiatan);
          }
          konpers.leaflet_kegiatan = leaflet_kegiatan[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (konpers.disposisi) {
            deleteFile(konpers.disposisi);
          }
          konpers.disposisi = disposisi[0].filename;
        }
        await konpers.save();

        res.status(200).json({
          message: `Konferensi Pers berhasil diperbarui`,
          data: konpers,
        });
      } else {
        res.status(404).json({
          message: 'Data konferensi pers tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deleteKonpers: async (req, res) => {
    const { id } = req.params;
    try {
      const konpers = await Konpers.findByPk(id);
      if (konpers) {
        if (konpers.surat_permohonan) {
          deleteFile(konpers.surat_permohonan);
        }
        if (konpers.leaflet_kegiatan) {
          deleteFile(konpers.leaflet_kegiatan);
        }
        if (konpers.disposisi) {
          deleteFile(konpers.disposisi);
        }
        await konpers.destroy();

        res.status(200).json({
          message: `Konferensi Pers '${konpers.judul_kegiatan}' berhasil dihapus`,
        });
      } else {
        res.status(404).json({
          message: 'Data konferensi pers tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewKonpersUser: async (req, res) => {
    const { id_account } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await Konpers.count();
      const totalPage = Math.ceil(totalRow / limit);
      const konpers = await Konpers.findAll({
        include: {
          model: Accounts,
          required: true,
        },
        where: { id_account },
        limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const modifiedKonpers = konpers.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${konpers.length} Layanan Konferensi Pers`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedKonpers,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
