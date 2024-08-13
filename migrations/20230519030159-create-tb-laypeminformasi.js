'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_laypeminformasi',
      {
          id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
          },
        id_account: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'tb_account',
            key: 'id',
          },
        },
        judul_permohonan: {
          type: Sequelize.STRING,
        },
        surat_permohonan: {
          type: Sequelize.STRING,
        },
        bahan_publikasi: {
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

    await queryInterface.addConstraint('tb_laypeminformasi', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_tb_laypeminformasi_tb_account',
      references: {
        table: 'tb_account',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'tb_laypeminformasi',
      'fk_tb_laypeminformasi_tb_account',
    );
    await queryInterface.dropTable('tb_laypeminformasi');
  },
};
