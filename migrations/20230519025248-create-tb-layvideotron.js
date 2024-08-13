'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_layvideotron',
      {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
        id_kegiatan: {
          type: Sequelize.INTEGER,
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
          id_status: {
              type: Sequelize.INTEGER,
              defaultValue: 1,
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
          allowNull: true,
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
