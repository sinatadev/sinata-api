const { tbl_lookup } = require('../models')

module.exports = {
    loadData: async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const offset = (page - 1) * limit;

            const totalRow = await tbl_lookup.count()
            const totalPage = Math.ceil(totalRow / limit);

            const lookups = await tbl_lookup.findAll({
                offset,
                limit,
                order: [[ 'createdAt', 'DESC' ]],
            })

            res.status(200).json({
                success: true,
                message: `Berhasil menampilkan ${lookups.length} data lookup`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: lookups
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }
    },
    createLookup: async (req, res) => {
        try {
            const { type, name, value, description, isActive } = req.body;
            const userId = req.user.id;

            var newLookup = await tbl_lookup.create({
                type,
                name,
                value,
                description,
                isActive,
                createdBy: userId
            })

            await newLookup.save();

            res.status(200).json({
                success: true,
                message: 'Berhasil menambahkan lookup baru'
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }
    },
    editLookup: async (req, res) => {
        try {
            const { id, type, name, value, description, isActive } = req.body;
            const userId = req.user.id

            const lookup = await tbl_lookup.findByPk(id)
            if (!lookup) {
                return res.status(404).json({
                    success: false,
                    message: 'Lookup tidak ditemukan'
                })

            }

            await lookup.update({
                type,
                name,
                value,
                description,
                isActive,
                updatedBy: userId
            })

            res.status(200).json({
                success: true,
                message: 'Berhasil mengubah data lookup'
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    },
    deleteLookup: async (req, res) => {
        try {
            const { id } = req.body;

            const lookup = await tbl_lookup.findByPk(id)
            if (!lookup) {
                return res.status(404).json({
                    success: false,
                    message: 'Data Lookup tidak ditemukan'
                })
            }

            await lookup.destroy()

            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus data lookup'
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
}