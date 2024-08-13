'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_kegiatan',
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
        judul_kegiatan: {
          type: Sequelize.STRING,
        },
        des_kegiatan: {
          type: Sequelize.TEXT,
        },
        sifat_kegiatan: {
          type: Sequelize.ENUM('Terbuka', 'Undangan'),
          defaultValue: 'Terbuka',
        },
        tgl_kegiatan: {
          type: Sequelize.DATE,
        },
        waktu_kegiatan: {
          type: Sequelize.TIME,
        },
        tempat_kegiatan: {
          type: Sequelize.STRING,
        },
        surat_permohonan: {
          type: Sequelize.STRING,
        },
        sik: {
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

    await queryInterface.addConstraint('tb_kegiatan', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_tb_kegiatan_tb_account',
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
      'tb_kegiatan',
      'fk_tb_kegiatan_tb_account',
    );
    await queryInterface.dropTable('tb_kegiatan');
  },
};
