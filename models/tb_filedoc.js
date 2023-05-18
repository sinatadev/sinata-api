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
    id_file: DataTypes.INTEGER,
    nama_file: DataTypes.STRING,
    tipe_file: DataTypes.STRING,
    size_file: DataTypes.INTEGER,
    data_file: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'tb_filedoc',
  });
  return tb_filedoc;
};