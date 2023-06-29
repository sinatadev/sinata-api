'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_layvideotron',
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

    await queryInterface.addConstraint('tb_layvideotron', {
      fields: ['id_kegiatan'],
      type: 'foreign key',
      name: 'fk_tb_layvideotron_tb_kegiatan',
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
      'tb_layvideotron',
      'fk_tb_layvideotron_tb_kegiatan',
    );
    await queryInterface.dropTable('tb_layvideotron');
  },
};
