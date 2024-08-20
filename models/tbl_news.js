'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tbl_news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tbl_news.init({
    serviceId: DataTypes.INTEGER,
    noRelase: DataTypes.STRING,
    title: DataTypes.STRING,
    categoryIds: DataTypes.STRING,
    jurnalisId: DataTypes.INTEGER,
    preRelease: DataTypes.TEXT,
    release: DataTypes.TEXT,
    uploadedAt: DataTypes.DATE,
    adminId: DataTypes.INTEGER,
    newsUrl: DataTypes.STRING,
    translationTitle: DataTypes.STRING,
    translatorId: DataTypes.INTEGER,
    translationRelease: DataTypes.TEXT,
    translationUploadedAt: DataTypes.DATE,
    translationAdminId: DataTypes.INTEGER,
    translationNewsUrl: DataTypes.STRING,
    publicationStatusId: DataTypes.INTEGER,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'tbl_news',
  });
  return tbl_news;
};