'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tbl_news', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      serviceId: {
        type: Sequelize.INTEGER
      },
      noRelase: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      categoryIds: {
        type: Sequelize.STRING
      },
      jurnalisId: {
        type: Sequelize.INTEGER
      },
      preRelease: {
        type: Sequelize.TEXT
      },
      release: {
        type: Sequelize.TEXT
      },
      uploadedAt: {
        type: Sequelize.DATE
      },
      adminId: {
        type: Sequelize.INTEGER
      },
      newsUrl: {
        type: Sequelize.STRING
      },
      translationTitle: {
        type: Sequelize.STRING
      },
      translatorId: {
        type: Sequelize.INTEGER
      },
      translationRelease: {
        type: Sequelize.TEXT
      },
      translationUploadedAt: {
        type: Sequelize.DATE
      },
      translationAdminId: {
        type: Sequelize.INTEGER
      },
      translationNewsUrl: {
        type: Sequelize.STRING
      },
      publicationStatusId: {
        type: Sequelize.INTEGER
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      updatedBy: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tbl_news');
  }
};