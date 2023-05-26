'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_laypeminformasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_laypeminformasi.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_account: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_account',
        key: 'id'
      }
    },
    judul_permohonan: {
      type: DataTypes.STRING
    },
    surat_permohonan: {
      type: DataTypes.STRING
    },
    bahan_publikasi: {
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
    }
  }, {
    sequelize,
    modelName: 'tb_laypeminformasi',
  });
  return tb_laypeminformasi;
};