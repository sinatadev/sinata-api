'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_arsipdesain',
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
        judul_desain: {
          type: Sequelize.STRING,
        },
        kategori: {
          type: Sequelize.STRING,
        },
        keterangan: {
          type: Sequelize.TEXT,
        },
        deadline: {
          type: Sequelize.DATE,
        },
          id_status: {
              type: Sequelize.INTEGER,
              defaultValue: 1,
          },
        lampiran_file: {
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

    await queryInterface.addConstraint('tb_arsipdesain', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_tb_arsipdesain_tb_account',
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
      'tb_arsipdesain',
      'fk_tb_arsipdesain_tb_account',
    );
    await queryInterface.dropTable('tb_arsipdesain');
  },
};
