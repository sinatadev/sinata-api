const ArsipPers = require('../models/tb_arsip_pers')
const Peliputans = require('../models/tb_laypeliputan')
const DataKegiatans = require('../models/tb_kegiatan')
const Accounts = require('../models/tb_account')

module.exports = {
    viewArsipPers: async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await ArsipPers.count()
            const totalPage = Math.ceil(totalRow / limit)
            const arsipPers = await ArsipPers.findAll({
                include: {
                    model: Peliputans,
                    required: true,
                    include: {
                        model: DataKegiatans,
                        required: true,
                        include: {
                            model: Accounts,
                            required: true
                        }
                    }
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            })

            const modifiedArsip = arsipPers.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_laypeliputan.tb_kegiatan.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${arsipPers.length} Arsip Pers.`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedArsip
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addArsipPers: async (req, res) => {
        const payload = req.body
        try {
            const arsipPers = await ArsipPers.create(payload)
            await arsipPers.save()

            res.status(201).json({
                message: `Arsip pers baru berhasil ditambahkan.`,
                data: arsipPers
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })

        }
    },
    editArsipPers: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const arsipPers = await ArsipPers.findByPk(id)
            if(arsipPers){
                Object.assign(arsipPers, payload)
                await arsipPers.save()

                res.status(200).json({
                    message: `Arsip pers berhasil diubah.`,
                    data: arsipPers
                })
            } else {
                res.status(404).json({
                    message: 'Data arsip pers tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteArsipPers: async (req, res) => {
        const { id } = req.params
        try {
            const arsipPers = await ArsipPers.findByPk(id)
            if(arsipPers) {
                await arsipPers.destroy()

                res.status(200).json({
                    message: `Arsip pers berhasil dihapus.`
                })
            } else {
                res.status(404).json({
                    message: 'Data arsip pers tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    viewPengumuman: async (req, res) => {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await ArsipPers.count()
            const totalPage = Math.ceil(totalRow / limit)
            const arsipPers = await ArsipPers.findAll({
                include: {
                    model: Peliputans,
                    required: true,
                    include: {
                        model: DataKegiatans,
                        required: true,
                        include: {
                            model: Accounts,
                            required: true
                        }
                    }
                },
                where: { kategori: 'Pengumuman' },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            })

            const modifiedArsip = arsipPers.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_laypeliputan.tb_kegiatan.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${arsipPers.length} Arsip Pers.`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedArsip
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
}