'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tb_arsipdesain extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tb_arsipdesain.init({
    id_account: DataTypes.INTEGER,
    judul_desain: DataTypes.STRING,
    kategori: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    deadline: DataTypes.DATE,
    status: DataTypes.STRING,
    lampiran_file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tb_arsipdesain',
  });
  return tb_arsipdesain;
};