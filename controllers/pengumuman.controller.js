const Pengumumans = require('../models/tb_pengumuman')

module.exports = {
    viewPengumuman: async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 4
        const offset = (page - 1) * limit
        const status = req.query.status || 'Active'
        try {
            const totalRow = await Pengumumans.count()
            const totalPage = Math.ceil(totalRow / limit)
            const pengumuman = await Pengumumans.findAll({
                where: { status }, 
                limit,
                offset,
                order: [['tgl_upload', 'DESC']]
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${pengumuman.length} Pengumuman.`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: pengumuman
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    viewOnePengumuman: async (req, res) => {
        const { id } = req.params
        try {
            const pengumuman = await Pengumumans.findByPk(id)

            res.status(200).json({
                message: `Berhasil menampilkan ${pengumuman.judul_pengumuman}.`,
                data: pengumuman
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addPengumuman: async (req, res) => {
        const payload = req.body
        try {
            const pengumuman = await Pengumumans.create(payload)
            await pengumuman.save()

            res.status(201).json({
                message: `Pengumuman baru berhasil ditambahkan.`,
                data: pengumuman
            })     
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editPengumuman: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const pengumuman = await Pengumumans.findByPk(id)
            if(pengumuman) {
                Object.assign(pengumuman, payload)
                await pengumuman.save()

                res.status(201).json({
                    message: `Pengumuman berhasil diubah.`,
                    data: pengumuman
                })         
            } else {
                res.status(404).json({
                    message: 'Data pengumuman tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deletePengumuman: async (req, res) => {
        const { id } = req.params
        try {
            const pengumuman = await Pengumumans.findByPk(id)
            if(pengumuman) {
                await pengumuman.destroy()

                res.status(201).json({
                    message: `Pengumuman berhasil dihapus.`
                })         
            } else {
                res.status(404).json({
                    message: 'Data pengumuman tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}