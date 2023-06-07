const Konpers = require('../models/tb_laykonpers')
const Accounts = require('../models/tb_account')

module.exports = {
    viewKonpers: async (req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await Konpers.count()
            const totalPage = Math.ceil(totalRow / limit)
            const konpers = await Konpers.findAll({
                include: {
                    model: Accounts,
                    required: true
                },
                limit,
                offset,
                order: [
                    [ 'createdAt', 'DESC' ]
                ]
            })

            const modifiedKonpers = konpers.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${konpers.length} Layanan Konferensi Pers`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedKonpers
            })

        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addKonpers: async (req, res) => {
        const payload = req.body
        try {
            const konpers = await Konpers.create(payload)
            await konpers.save()

            res.status(201).json({
                message: `Konferensi Pers '${payload.judul_kegiatan}' berhasil ditambahkan.`,
                data: konpers
            })

        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })

        }
    },
    editKonpers: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const konpers = await Konpers.findByPk(id)
            if(konpers) {
                Object.assign(konpers, payload)
                await konpers.save()

                res.status(200).json({
                    message: `Konferensi Pers '${payload.judul_kegiatan}' berhasil diperbarui`,
                    data: konpers
                })
            } else {
                res.status(404).json({
                    message: 'Data konferensi pers tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteKonper: async (req, res) => {
        const { id } = req.params
        try {
            const konpers = await Konpers.findByPk(id)
            if(konpers) {
                await konpers.destroy()

                    res.status(200).json({
                    message: `Konferensi Pers '${konpers.judul_kegiatan}' berhasil dihapus`,
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}