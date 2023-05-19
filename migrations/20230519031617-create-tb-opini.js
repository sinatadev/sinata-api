'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_opini', {
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
          key: 'id'
        }
      },
      judul_pembahasan: {
        type: Sequelize.STRING
      },
      surat_permohonan: {
        type: Sequelize.STRING
      },
      foto_penulis: {
        type: Sequelize.STRING
      },
      bahan_publikasi: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      disposisi: {
        type: Sequelize.STRING
      },
      tgl_waktu_upload: {
        type: Sequelize.DATE
      },
      admin: {
        type: Sequelize.STRING
      },
      link_berita: {
        type: Sequelize.STRING
      },
      penerjemah: {
        type: Sequelize.STRING
      },
      tgl_waktu_upload_terj: {
        type: Sequelize.DATE
      },
      admin_terj: {
        type: Sequelize.STRING
      },
      link_terj: {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tb_opini');
  }
};