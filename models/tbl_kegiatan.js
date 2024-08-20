'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_kegiatan.init({
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    visibilityId: DataTypes.INTEGER,
    eventDate: DataTypes.DATE,
    location: DataTypes.STRING,
    suratPermohonan: DataTypes.STRING,
    sik: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_kegiatan',
  });
  return tbl_kegiatan;
};