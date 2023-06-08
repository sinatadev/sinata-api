const ArsipDesains = require('../models/tb_arsipdesain')
const Accounts = require('../models/tb_account')
const deleteFile = require('../utils/deleteFIle.util')

module.exports = {
    viewArsipDesain: async (req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await ArsipDesains.count()
            const totalPage = Math.ceil(totalRow / limit)
            const arsipdesain = await ArsipDesains.findAll({
                include: {
                    model: Accounts,
                    required: true
                },
                limit,
                offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            const modifiedArsipDesain = arsipdesain.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_account.password = undefined
                return modifiedItem
            })
            
            res.status(200).json({
                message: `Berhasil menampilkan ${arsipdesain.length} Arsip Desain`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedArsipDesain
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addArsipDesain: async (req, res) => {
        const payload = req.body
        try {
            const arsipDesain = await ArsipDesains.create(payload)
            if(req.file){
                arsipDesain.lampiran_file = req.file.filename
            }
            await arsipDesain.save()

            res.status(201).json({
                message: `Arsip '${payload.judul_desain}' berhasil ditambahkan.`,
                data: arsipDesain
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    editArsipDesain: async (req, res) => {
        const { id } = req.params
        const payload = req.body
        try {
            const arsipDesain = await ArsipDesains.findByPk(id)
            if(arsipDesain) {
                Object.assign(arsipDesain, payload)
                if(req.file){
                    arsipDesain.lampiran_file = req.file.filename
                }
                await arsipDesain.save()
                
                res.status(200).json({
                    message: `Arsip '${payload.judul_desain}' berhasil diperbarui`,
                    data: arsipDesain
                })
            } else {
                res.status(404).json({
                    message: 'Arsip desain tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    deleteArsipDesain: async (req, res) => {
        const { id } = req.params
        try {
            const arsipDesain = await ArsipDesains.findByPk(id)
            
            if(arsipDesain) {
                if(arsipDesain.lampiran_file) {
                    deleteFile(arsipDesain.lampiran_file)
                }
                await arsipDesain.destroy()

                res.status(200).json({
                    message: `Arsip '${arsipDesain.judul_desain}' berhasil dihapus`,
                })
            } else {
                res.status(404).json({
                    message: 'Arsip desain tidak ditemukan.'
                })
            }
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}