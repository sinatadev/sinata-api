'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_laybaliho',
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
        bukti_pembayaran: {
          type: Sequelize.STRING,
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
