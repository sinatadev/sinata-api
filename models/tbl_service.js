'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_service.init({
    kegiatanId: DataTypes.INTEGER,
    jenisLayananId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    statusLayananId: DataTypes.INTEGER,
    disposisi: DataTypes.STRING,
    luaranLayanan: DataTypes.TEXT,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    doc1: DataTypes.STRING,
    doc2: DataTypes.STRING,
    doc3: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_service',
  });
  return tbl_service;
};