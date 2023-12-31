'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_dokumentasi',
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
        keterangan: {
          type: Sequelize.TEXT,
        },
        fotografer: {
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

    await queryInterface.addConstraint('tb_dokumentasi', {
      fields: ['id_kegiatan'],
      type: 'foreign key',
      name: 'fk_tb_dokumentasi_tb_kegiatan',
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
      'tb_dokumentasi',
      'fk_tb_dokumentasi_tb_kegiatan',
    );
    await queryInterface.dropTable('tb_dokumentasi');
  },
};
