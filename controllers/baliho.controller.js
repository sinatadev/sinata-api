const Balihos = require('../models/tb_laybaliho')
const DataKegiatans = require('../models/tb_kegiatan')
const Accounts = require('../models/tb_account')

module.exports = {
    viewBaliho: async (req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit
        try {
            const totalRow = await Balihos.count()
            const totalPage = Math.ceil(totalRow / limit)
            const baliho = Balihos.findAll({
                include: {
                    model: DataKegiatans,
                    required: true,
                    include : {
                        model: Accounts,
                        required: true
                    }
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            })

            const modifiedBaliho = baliho.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_kegiatan.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${baliho.length} Layanan Pemasangan Baliho`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedBaliho
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}