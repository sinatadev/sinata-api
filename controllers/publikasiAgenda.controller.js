const PublikasiAgenda = require('../models/tb_laypubagenda')
const DataKegiatan = require('../models/tb_kegiatan')
const Accounts = require('../models/tb_account')

module.exports = {
    viewAgenda: async(req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await PublikasiAgenda.count()
            const totalPage = Math.ceil(totalRow / limit)
            const agenda = await PublikasiAgenda.findAll({ 
                include: {
                    model: DataKegiatan,
                    required: true,
                    include: {
                        model: Accounts,
                        required: true
                    }
                },
                where: { status: 'Complete' }, 
                limit: limit,
                offset,
                order: [
                    ['createdAt', 'DESC']
                ]
            })

            const modifiedAgenda = agenda.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_kegiatan.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${agenda.length} Agenda Terkini`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedAgenda
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    addAgenda: async(req, res) => {
        try {
            const payload = req.body

            const agenda = await PublikasiAgenda.create(payload)
            await agenda.save()

            res.status(201).json({
                message: `Agenda berhasil ditambahkan.`,
                data: agenda
            })
            
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}