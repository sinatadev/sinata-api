const LiveStreamings = require('../models/tb_laylivestr');
const DataKegiatans = require('../models/tb_kegiatan');
const Accounts = require('../models/tb_account');
const deleteFile = require('../utils/deleteFIle.util');

module.exports = {
  viewLiveStreaming: async (req, res) => {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    try {
      const totalRow = await LiveStreamings.count();
      const totalPage = Math.ceil(totalRow / limit);
      const liveStreaming = await LiveStreamings.findAll({
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

      const modifiedLiveStreaming = liveStreaming.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan ${liveStreaming.length} Layanan Live Streaming.`,
        page,
        totalPage,
        totalRow,
        rowsPerPage: limit,
        data: modifiedLiveStreaming,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  viewOneLiveStreaming: async (req, res) => {
    const { id } = req.params;
    try {
      const liveStreaming = await LiveStreamings.findAll({
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

      const modifiedLiveStreaming = liveStreaming.map((item) => {
        const modifiedItem = { ...item.toJSON() };
        modifiedItem.tb_kegiatan.tb_account.password = undefined;
        return modifiedItem;
      });

      res.status(200).json({
        message: `Berhasil menampilkan Layanan Live Streaming.`,
        data: modifiedLiveStreaming,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  addLiveStreaming: async (req, res) => {
    const payload = req.body;
    try {
      const liveStreaming = await LiveStreamings.create(payload);
      if (req.files.thumbnail_kegiatan) {
        const { thumbnail_kegiatan } = req.files;
        liveStreaming.thumbnail_kegiatan = thumbnail_kegiatan[0].filename;
      }
      if (req.files.disposisi) {
        const { disposisi } = req.files;
        liveStreaming.disposisi = disposisi[0].filename;
      }
      await liveStreaming.save();

      res.status(201).json({
        message: `Layanan live streaming baru berhasil ditambahkan.`,
        data: liveStreaming,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  editLiveStreaming: async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
      const liveStreaming = await LiveStreamings.findByPk(id);
      if (liveStreaming) {
        Object.assign(liveStreaming, payload);
        if (req.files.thumbnail_kegiatan) {
          const { thumbnail_kegiatan } = req.files;
          if (liveStreaming.thumbnail_kegiatan) {
            deleteFile(liveStreaming.thumbnail_kegiatan);
          }
          liveStreaming.thumbnail_kegiatan = thumbnail_kegiatan[0].filename;
        }
        if (req.files.disposisi) {
          const { disposisi } = req.files;
          if (liveStreaming.disposisi) {
            deleteFile(liveStreaming.disposisi);
          }
          liveStreaming.disposisi = disposisi[0].filename;
        }
        await liveStreaming.save();

        res.status(200).json({
          message: `Layanan live streaming berhasil diubah.`,
          data: liveStreaming,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan live streaming tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
  deleteLiveStreaming: async (req, res) => {
    const { id } = req.params;
    try {
      const liveStreaming = await LiveStreamings.findByPk(id);
      if (liveStreaming) {
        if (liveStreaming.thumbnail_kegiatan) {
          deleteFile(liveStreaming.thumbnail_kegiatan);
        }
        if (liveStreaming.disposisi) {
          deleteFile(liveStreaming.disposisi);
        }
        await liveStreaming.destroy();

        res.status(200).json({
          message: `Layanan live streaming berhasil dihapus.`,
        });
      } else {
        res.status(404).json({
          message: 'Data layanan live streaming tidak ditemukan.',
        });
      }
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Internal Server Error',
      });
    }
  },
};
