'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_filedoc extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_filedoc.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    id_file: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'tb_dokumentasi',
        key: 'id'
      }
    },
    nama_file: {
      type: DataTypes.STRING
    },
    tipe_file: {
      type: DataTypes.STRING
    },
    size_file: {
      type: DataTypes.INTEGER
    },
    data_file: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'tb_filedoc',
  });
  return tb_filedoc;
};