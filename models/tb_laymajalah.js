'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
const tb_kegiatan = require('./tb_kegiatan');

class tb_laymajalah extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laymajalah.init({
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4
  },
  id_kegiatan: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'tb_kegiatan',
      key: 'id'
    }
  },
  bahan_publikasi: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved & On Progress', 'Rejected', 'Complete'),
    defaultValue: 'Pending',  
  },
  disposisi: {
    type: DataTypes.STRING
  },
  luaran_layanan: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'tb_laymajalah',
  freezeTableName: true
})

tb_laymajalah.belongsTo(tb_kegiatan, { foreignKey: 'id_kegiatan' })
tb_kegiatan.hasMany(tb_laymajalah, { foreignKey: 'id_kegiatan' })

module.exports = tb_laymajalah