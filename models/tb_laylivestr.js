'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class tb_laylivestr extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laylivestr.init({
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
  thumbnail_kegiatan: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.STRING
  },
  disposisi: {
    type: DataTypes.STRING
  },
  luaran_layanan: {
    type: DataTypes.STRING
  },
}, {
  sequelize,
  modelName: 'tb_laylivestr',
  freezeTableName: true
});

module.exports = tb_laylivestr