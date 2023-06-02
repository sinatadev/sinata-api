const PublikasiAgenda = require('../models/tb_laypubagenda')
const DataKegiatan = require('../models/tb_kegiatan')
const Accounts = require('../models/tb_account')

module.exports = {
    viewAgenda: async(req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 5
            const agenda = await PublikasiAgenda.findAll({ where: { status: 'Complete' }, limit: limit})

            res.status(200).json({
                message: `Berhasil menampilkan ${limit} Agenda Terkini`,
                data: agenda
            })
        } catch (error) {
            res.status(500).json({
                message: error.message || 'Internal Server Error'
            })
        }
    },
    // addAgenda: async(req, res) => {
    //     try {
    //         // const 
    //     } catch (error) {
            
    //     }
    // }
}