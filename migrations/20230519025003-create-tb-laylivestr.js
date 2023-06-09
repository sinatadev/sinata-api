'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laylivestr', {
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
          key: 'id'
        }
      },
      thumbnail_kegiatan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Approved & On Progress', 'Rejected', 'Complete'),
        defaultValue: 'Pending',    
      },
      disposisi: {
        type: Sequelize.STRING
      },
      luaran_layanan: {
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

    await queryInterface.addConstraint('tb_laylivestr', {
      fields: ['id_kegiatan'],
      type: 'foreign key',
      name: 'fk_tb_laylivestr_tb_kegiatan',
      references: {
        table: 'tb_kegiatan',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tb_laylivestr', 'fk_tb_laylivestr_tb_kegiatan')
    await queryInterface.dropTable('tb_laylivestr');
  }
};