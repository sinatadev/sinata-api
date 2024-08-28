const { tbl_role } = require("../models");
const error = require("multer/lib/multer-error");
module.exports = {
    loadData: async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        try {
            const totalRow = await tbl_role.count();
            const totalPage = Math.ceil(totalRow / limit);

            const roles = await tbl_role.findAll({
                offset: offset,
                limit,
                order: [[ 'createdAt', 'DESC' ]],
            })

            res.status(200).json({
                message: `Berhasil menampilkan ${roles.length} data roles`,
                page,
                totalPage,
                totalRow,
                rowsPerPage: limit,
                data: roles
            })
        } catch (e) {
            res.status(500).json({
                message: 'Internal Server Error',
                error: e.message
            })
        }
    },
    create: async (req, res) => {
        try {
            const { name, description, isActive } = req.body;
            let userId = req.user.id;

            var newRole = await tbl_role.create({
                name,
                description,
                isActive,
                createdBy: userId
            })

            await newRole.save();

            res.status(200).json({
                success: true,
                message: 'Berhasil menambahkan role baru'
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
            })
        }
    },
    edit: async (req, res) => {
        try {
            const { id, name, description, isActive } = req.body;
            let userId = req.user.id;

            const role = await tbl_role.findByPk(id)
            if (!role) {
                res.status(404).json({
                    success: false,
                    message: 'Role tidak ditemukan.'
                })
                return
            }

            await role.update({
                name,
                description,
                isActive,
                updatedBy: userId
            })

            res.status(200).json({
                success: true,
                message: 'Berhasil mengubah role'
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    },
    deleteRole: async (req, res) => {
        try {
            const { id } = req.body;

            const role = await tbl_role.findByPk(id);
            if (!role) {
                res.status(404).json({
                    success: false,
                    message: 'Role tidak ditemukan.'
                })
                return
            }

            // delete
            await role.destroy()

            res.status(200).json({
                success: true,
                message: 'Berhasil menghapus role'
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                message: 'Internal Server Error'
            })
        }
    }
}