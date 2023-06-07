'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_laypeminformasi', {
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
      judul_permohonan: {
        type: Sequelize.STRING
      },
      surat_permohonan: {
        type: Sequelize.STRING
      },
      bahan_publikasi: {
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

    await queryInterface.addConstraint('tb_laypeminformasi', {
      fields: ['id_account'],
      type: 'foreign key',
      name: 'fk_tb_laypeminformasi_tb_account',
      references: {
        table: 'tb_account',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tb_laypeminformasi', 'fk_tb_laypeminformasi_tb_account')
    await queryInterface.dropTable('tb_laypeminformasi');
  }
};