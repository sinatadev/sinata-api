'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_opini',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        id_account: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'tb_account',
            key: 'id',
          },
        },
        judul_pembahasan: {
          type: Sequelize.STRING,
        },
        surat_permohonan: {
          type: Sequelize.STRING,
        },
        foto_penulis: {
          type: Sequelize.STRING,
        },
        bahan_publikasi: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM(
            'Pending',
            'Approved & On Progress',
            'Rejected',
            'Complete',
          ),
          defaultValue: 'Pending',
        },
        disposisi: {
          type: Sequelize.STRING,
        },
        tgl_waktu_upload: {
          type: Sequelize.DATE,
        },
        admin: {
          type: Sequelize.STRING,
        },
        link_berita: {
          type: Sequelize.STRING,
        },
        penerjemah: {
          type: Sequelize.STRING,
        },
        tgl_waktu_upload_terj: {
          type: Sequelize.DATE,
        },
        admin_terj: {
          type: Sequelize.STRING,
        },
        link_terj: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      {
        freezeTableName: true,
      },
    );

    await queryInterface.addConstraint('tb_opini', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_tb_opini_tb_account',
      references: {
        table: 'tb_account',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tb_opini', 'fk_tb_opini_tb_account');
    await queryInterface.dropTable('tb_opini');
  },
};
