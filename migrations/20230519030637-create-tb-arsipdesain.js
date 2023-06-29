'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'tb_arsipdesain',
      {
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
        status: {
          type: Sequelize.ENUM(
            'Pending',
            'Approved & On Progress',
            'Rejected',
            'Complete',
          ),
          defaultValue: 'Pending',
        },
        lampiran_file: {
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
