'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_arsip_pers',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
        },
        id_peliputan: {
          type: Sequelize.UUID,
          allowNull: false,
          references: {
            model: 'tb_laypeliputan',
            key: 'id',
          },
        },
        no_rilis: {
          type: Sequelize.STRING,
        },
        judul_berita: {
          type: Sequelize.TEXT,
        },
        kategori: {
          type: Sequelize.STRING,
        },
        jurnalis: {
          type: Sequelize.STRING,
        },
        prarilis: {
          type: Sequelize.TEXT,
        },
        rilis: {
          type: Sequelize.TEXT,
        },
        tgl_upload: {
          type: Sequelize.DATE,
        },
        waktu_upload: {
          type: Sequelize.TIME,
        },
        admin: {
          type: Sequelize.STRING,
        },
        link_berita: {
          type: Sequelize.TEXT,
        },
        judul_terjemahan: {
          type: Sequelize.TEXT,
        },
        penerjemah: {
          type: Sequelize.STRING,
        },
        naskah_terj: {
          type: Sequelize.TEXT,
        },
        tgl_upload_terj: {
          type: Sequelize.DATE,
        },
        waktu_upload_terj: {
          type: Sequelize.TIME,
        },
        admin_terj: {
          type: Sequelize.STRING,
        },
        link_terj: {
          type: Sequelize.TEXT,
        },
        status_publikasi: {
          type: Sequelize.ENUM('ID', 'EN', 'Selesai'),
          defaultValue: 'ID',
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

    await queryInterface.addConstraint('tb_arsip_pers', {
      fields: ['id_peliputan'],
      type: 'foreign key',
      name: 'fk_tb_arsip_pers_tb_laypeliputan',
      references: {
        table: 'tb_laypeliputan',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(
      'tb_arsip_pers',
      'fk_tb_arsip_pers_tb_laypeliputan',
    );
    await queryInterface.dropTable('tb_arsip_pers');
  },
};
