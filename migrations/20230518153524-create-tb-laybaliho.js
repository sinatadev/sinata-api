'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_laybaliho',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        id_kegiatan: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'tb_kegiatan',
            key: 'id',
          },
        },
        bahan_publikasi: {
          type: Sequelize.STRING,
        },
        tgl_awal: {
          type: Sequelize.DATE,
        },
        tgl_akhir: {
          type: Sequelize.DATE,
        },
        bukti_pembayaran: {
          type: Sequelize.STRING,
        },
        status: {
          type: Sequelize.ENUM(
            'Pending',
            'Approved & On Progress',
            'Rejected',
            'Completed',
          ),
          defaultValue: 'Pending',
        },
        disposisi: {
          type: Sequelize.STRING,
        },
        luaran_layanan: {
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

    await queryInterface.addConstraint('tb_laybaliho', {
      fields: ['id_kegiatan'],
      type: 'foreign key',
      name: 'fk_tb_laybaliho_tb_kegiatan',
      references: {
        table: 'tb_kegiatan',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'tb_laybaliho',
      'fk_tb_laybaliho_tb_kegiatan',
    );
    await queryInterface.dropTable('tb_laybaliho');
  },
};
