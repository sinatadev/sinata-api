const Accounts = require('../models/tb_account')
const Kegiatans = require('../models/tb_kegiatan')

module.exports = {
    viewDataKegiatan: async(req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await Kegiatans.count()
            const totalPage = Math.ceil(totalRow / limit)
            const kegiatan = await Kegiatans.findAll({
                include: {
                    model: Accounts,
                    required: true
                },
                limit: limit,
                offset: offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })
            res.status(200).json({
                message: `Berhasil menampilkan ${kegiatan.length} data kegiatan tersimpan.`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: kegiatan
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })

        }
    },
    addDataKegiatan: async(req, res) => {
        try {
            const payload = req.body

            const kegiatan = await Kegiatans.create(payload)
            await kegiatan.save()

            res.status(201).json({
                message: `Kegiatan '${payload.judul_kegiatan}' berhasil ditambahkan.`,
                data: kegiatan
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editDataKegiatan: async(req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const kegiatan = await Kegiatans.findByPk(id)
            if(kegiatan){
                Object.assign(kegiatan, payload)
                await kegiatan.save()

                res.status(200).json({
                    message: `Kegiatan '${kegiatan.judul_kegiatan}' berhasil diperbarui`,
                    data: kegiatan
                })
            } else {
                res.status(404).json({
                    message: 'Data kegiatan tidak ditemukan.'
                })
            }  
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteDataKegiatan: async(req, res) => {
        const { id } = req.params
        try {
            const kegiatan = await Kegiatans.findByPk(id)
            
            if(kegiatan){
                await kegiatan.destroy()
                
                res.status(200).json({
                    message: `Kegiatan '${kegiatan.judul_kegiatan}' berhasil dihapus.`
                })
            } else {
                res.status(404).json({
                    message: 'Data kegiatan tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}