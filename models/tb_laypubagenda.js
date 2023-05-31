'use strict';
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');

class tb_laypubagenda extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
tb_laypubagenda.init({
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
  leaflet_kegiatan: {
    type: DataTypes.STRING
  },
  caption: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING
  },
  disposisi: {
    type: DataTypes.STRING
  },
  luaran_layanan: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'tb_laypubagenda',
  freezeTableName
});

module.exports = tb_laypubagenda