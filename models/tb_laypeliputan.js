'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

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
tb_laypeliputan.init({
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
  judul_berita: {
    type: DataTypes.STRING
  },
  kategori: {
    type: DataTypes.STRING
  },
  leaflet_kegiatan: {
    type: DataTypes.STRING
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Approved & On Progress', 'Rejected', 'Complete'),
    defaultValue: 'Pending',  
  },
  disposisi: {
    type: DataTypes.STRING
  },
  jurnalis: {
    type: DataTypes.STRING
  },
  prarilis: {
    type: DataTypes.TEXT
  },
  rilis: {
    type: DataTypes.TEXT
  }
}, {
  sequelize,
  modelName: 'tb_laypeliputan',
  freezeTableName: true
});

module.exports = tb_laypeliputan