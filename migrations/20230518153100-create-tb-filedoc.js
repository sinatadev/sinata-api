'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tb_filedoc', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      id_dokumentasi: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'tb_dokumentasi',
          key: 'id'
        }
      },
      nama_file: {
        type: Sequelize.STRING
      },
      tipe_file: {
        type: Sequelize.STRING
      },
      size_file: {
        type: Sequelize.INTEGER
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

    await queryInterface.addConstraint('tb_filedoc', {
      fields: ['id_dokumentasi'],
      type: 'foreign key',
      name: 'fk_tb_filedoc_tb_dokumentasi',
      references: {
        table: 'tb_dokumentasi',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('tb_filedoc', 'fk_tb_filedoc_tb_dokumentasi')
    await queryInterface.dropTable('tb_filedoc');
  }
};