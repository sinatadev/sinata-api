const Opinis = require('../models/tb_opini')
const Account = require('../models/tb_account')

module.exports = {
    viewOpini: async (req, res) => {
        const page = req.query.page || 1
        const limit = parseInt(req.query.limit) || 5
        const offset = (page - 1) * limit 
        try {
            const totalRow = await Opinis.count()
            const totalPage = Math.ceil(totalRow / limit)
            const opini = await Opinis.findAll({
                include: {
                    model: Account,
                    required: true
                },
                limit,
                offset,
                order: [[ 'createdAt', 'DESC' ]]
            })

            const modifiedOpini = opini.map(item => {
                const modifiedItem = { ...item.toJSON() }
                modifiedItem.tb_account.password = undefined
                return modifiedItem
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${opini.length} Data Opini`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: modifiedOpini
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    }
}