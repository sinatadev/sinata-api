const PublikasiAgendas = require('../models/tb_laypubagenda');
const DataKegiatans = require('../models/tb_kegiatan');
const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewAgenda: async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const status = req.query.status || null;
    try {
      const totalRow = await PublikasiAgendas.count();
      const totalPage = Math.ceil(totalRow / limit);
      let agenda;
      if (status) {
        agenda = await PublikasiAgendas.findAll({
          include: {
            model: DataKegiatans,
            required: true,
            include: {
              model: Accounts,
              required: true,
            },
          },
          where: { status },
          limit: limit,
          offset,
          order: [['createdAt', 'DESC']],
        });
      } else {
        agenda = await PublikasiAgendas.findAll({
          include: {
            model: DataKegiatans,
            required: true,
            include: {
              model: Accounts,
              required: true,
            },
          },
          limit: limit,
          offset,
          order: [['createdAt', 'DESC']],
        });
      }

      const modifiedAgenda = agenda.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${agenda.length} Layanan Publikasi Agenda`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedAgenda,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addAgenda: async (req, res) => {
    const payload = req.body;
    try {
      const agenda = await PublikasiAgendas.create(payload);

      if (req.files.leaflet_kegiatan) {
        const { leaflet_kegiatan } = req.files;
        agenda.leaflet_kegiatan = leaflet_kegiatan[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        agenda.disposisi = disposisi[0].filename;
      }
      await agenda.save();

      res.status(201).json({
        message: `Layanan Publikasi Agenda berhasil ditambahkan.`,
        data: agenda,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editAgenda: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const agenda = await PublikasiAgendas.findByPk(id);
      if (agenda) {
        Object.assign(agenda, payload);

        if (req.files.leaflet_kegiatan) {
          const { leaflet_kegiatan } = req.files;
          if (agenda.leaflet_kegiatan) {
            deleteFile(agenda.leaflet_kegiatan);
          }
          agenda.leaflet_kegiatan = leaflet_kegiatan[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (agenda.disposisi) {
            deleteFile(agenda.disposisi);
          }
          agenda.disposisi = disposisi[0].filename;
        }
        await agenda.save();

        res.status(200).json({
          message: `Layanan Publikasi Agenda berhasil diperbarui`,
          data: agenda,
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
  deleteAgenda: async (req, res) => {
    const { id } = req.params;
    try {
      const agenda = await PublikasiAgendas.findByPk(id);
      if (agenda) {
        if (agenda.leaflet_kegiatan) {
          deleteFile(agenda.leaflet_kegiatan);
        }
        if (agenda.disposisi) {
          deleteFile(agenda.disposisi);
        }
        await agenda.destroy();

        res.status(200).json({
          message: `Layanan Publikasi Agenda berhasil dihapus`,
          data: agenda,
        });
      } else {
        res.status(404).json({
          message: 'Layanan Publikasi Agenda tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewKalenderData: async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await PublikasiAgendas.count();
      const totalPage = Math.ceil(totalRow / limit);
      const agenda = await PublikasiAgendas.findAll({
        include: {
          model: DataKegiatans,
          required: true,
        },
        where: { status: 'Completed' },
        limit: limit,
        offset,
        order: [['createdAt', 'DESC']],
      });

      const mappedAgenda = agenda.map((item) => {
        return {
          id: item.id,
          title: item.tb_kegiatan.judul_kegiatan,
          date: item.tb_kegiatan.tgl_kegiatan,
          description: item.tb_kegiatan.des_kegiatan,
          image: item.leaflet_kegiatan,
          link: item.id,
        };
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${agenda.length} Agenda Terkini`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: mappedAgenda,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneAgenda: async (req, res) => {
    const { id } = req.params;
    try {
      const agenda = await PublikasiAgendas.findAll({
        include: {
          model: DataKegiatans,
          required: true,
          include: {
            model: Accounts,
            required: true,
          },
        },
        where: { id },
      });

      const modifiedAgenda = agenda.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: 'Berhasil menampilkan detail Layanan Publikasi Agenda.',
        data: modifiedAgenda,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
