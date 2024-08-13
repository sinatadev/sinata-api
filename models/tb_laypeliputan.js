'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_kegiatan = require('./tb_kegiatan');

class tb_laypeliputan extends Model {
	/**
	 * Helper method for defining associations.
	 * This method is not a part of Sequelize lifecycle.
	 * The `models/index` file will call this method automatically.
	 */
	static associate(models) {
		// define association here
	}
}
tb_laypeliputan.init(
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.NUMBER
		},
		id_kegiatan: {
			type: DataTypes.NUMBER,
			allowNull: false,
			references: {
				model: 'tb_kegiatan',
				key: 'id',
			},
		},
		leaflet_kegiatan: {
			type: DataTypes.STRING,
		},
		bahan_publikasi: {
			type: DataTypes.STRING,
		},
		id_status: {
			type: DataTypes.NUMBER,
			defaultValue: 1,
		},
		disposisi: {
			type: DataTypes.STRING,
		},
		pic: {
			type: DataTypes.STRING,
		},
		keterangan: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		modelName: 'tb_laypeliputan',
		freezeTableName: true,
	},
);

tb_laypeliputan.belongsTo(tb_kegiatan, { foreignKey: 'id_kegiatan' });
tb_kegiatan.hasMany(tb_laypeliputan, {
	as: 'tb_laypeliputan',
	foreignKey: 'id_kegiatan',
});

module.exports = tb_laypeliputan;
