'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_laypubagenda',
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
        leaflet_kegiatan: {
          type: Sequelize.STRING,
        },
        caption: {
          type: Sequelize.TEXT,
        },
        status: {
          type: Sequelize.ENUM(
            'Pending',
            'Approved & On Progress',
            'Rejected',
            'Completed',
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

    await queryInterface.addConstraint('tb_laypubagenda', {
      fields: ['id_kegiatan'],
      type: 'foreign key',
      name: 'fk_tb_laypubagenda_tb_kegiatan',
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
      'tb_laypubagenda',
      'fk_tb_laypubagenda_tb_kegiatan',
    );
    await queryInterface.dropTable('tb_laypubagenda');
  },
};
