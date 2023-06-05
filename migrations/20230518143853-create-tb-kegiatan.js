'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_kegiatan', {
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
          key: 'id'
        }
      },
      judul_kegiatan: {
        type: Sequelize.STRING
      },
      des_kegiatan: {
        type: Sequelize.TEXT
      },
      sifat_kegiatan: {
        type: Sequelize.STRING
      },
      tgl_kegiatan: {
        type: Sequelize.DATE
      },
      waktu_kegiatan: {
        type: Sequelize.TIME
      },
      tempat_kegiatan: {
        type: Sequelize.STRING
      },
      surat_permohonan: {
        type: Sequelize.STRING
      },
      sik: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('tb_kegiatan', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_tb_kegiatan_tb_account',
      references: {
        table: 'tb_account',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tb_kegiatan', 'fk_tb_kegiatan_tb_account')
    await queryInterface.dropTable('tb_kegiatan')
  }
};