'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_laypeliputan = require('../models/tb_laypeliputan');

class tb_arsip_pers extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
tb_arsip_pers.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.NUMBER
		},
		id_peliputan: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'tb_laypeliputan',
				key: 'id',
			},
		},
		no_rilis: {
			type: DataTypes.STRING,
		},
		judul_berita: {
			type: DataTypes.TEXT,
		},
		kategori: {
			type: DataTypes.STRING,
		},
		jurnalis: {
			type: DataTypes.STRING,
		},
		prarilis: {
			type: DataTypes.TEXT,
		},
		rilis: {
			type: DataTypes.TEXT,
		},
		tgl_upload: {
			type: DataTypes.DATE,
		},
		waktu_upload: {
			type: DataTypes.TIME,
		},
		admin: {
			type: DataTypes.STRING,
		},
		link_berita: {
			type: DataTypes.TEXT,
		},
		judul_terjemahan: {
			type: DataTypes.TEXT,
		},
		penerjemah: {
			type: DataTypes.STRING,
		},
		naskah_terj: {
			type: DataTypes.TEXT,
		},
		tgl_upload_terj: {
			type: DataTypes.DATE,
		},
		waktu_upload_terj: {
			type: DataTypes.TIME,
		},
		admin_terj: {
			type: DataTypes.STRING,
		},
		link_terj: {
			type: DataTypes.TEXT,
		},
		status_publikasi: {
			type: DataTypes.ENUM('Pending', 'ID', 'EN', 'Selesai'),
			defaultValue: 'ID',
		},
	},
	{
		sequelize,
		modelName: 'tb_arsip_pers',
		freezeTableName: true,
	},
);

tb_arsip_pers.belongsTo(tb_laypeliputan, { foreignKey: 'id_peliputan' });
tb_laypeliputan.hasMany(tb_arsip_pers, {
	as: 'tb_arsip_pers',
	foreignKey: 'id_peliputan',
});

module.exports = tb_arsip_pers;
