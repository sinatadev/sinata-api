const Accounts = require('../models/tb_account')
const Kegiatans = require('../models/tb_kegiatan')

module.exports = {
    viewDataKegiatan: async(req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5
            const kegiatan = await Kegiatans.findAll({
                include: {
                    model: Accounts,
                    required: true
                },
                limit: limit
            })
            res.status(200).json({
                message: `Berhasil menampilkan ${limit} data kegiatan tersimpan.`,
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
            
        } catch (error) {
            
        }
    }
}