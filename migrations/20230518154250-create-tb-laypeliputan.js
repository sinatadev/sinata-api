'use strict';
const {DataTypes} = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable(
			'tb_laypeliputan',
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				id_kegiatan: {
					type: Sequelize.INTEGER,
					allowNull: false,
					references: {
						model: 'tb_kegiatan',
						key: 'id',
					},
				},
				leaflet_kegiatan: {
					type: Sequelize.STRING,
				},
				bahan_publikasi: {
					type: Sequelize.STRING,
				},
				id_status: {
					type: Sequelize.INTEGER,
					defaultValue: 1,
				},
				disposisi: {
					type: Sequelize.STRING,
				},
				pic: {
					type: Sequelize.STRING,
				},
				keterangan: {
					type: Sequelize.TEXT,
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
				tableName: 'tb_laypeliputan',
				freezeTableName: true,
			},
		);

		await queryInterface.addConstraint('tb_laypeliputan', {
			fields: ['id_kegiatan'],
			type: 'foreign key',
			name: 'fk_tb_laypeliputan_tb_kegiatan',
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
			'tb_laypeliputan',
			'fk_tb_laypeliputan_tb_kegiatan',
		);
		await queryInterface.dropTable('tb_laypeliputan');
	},
};
