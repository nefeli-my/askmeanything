'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question_Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question_Keyword.belongsTo(models.Keyword, {foreignKey: {name:'keywordId', allowNull: false}})
      Question_Keyword.belongsTo(models.Question, {foreignKey: {name:'questionId', allowNull: false}})
    }
  };
  Question_Keyword.init({
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter(value) {
          if (Date.parse(value) < Date.parse(this.createdAt)) {
            throw new Error('UpdatedAt should not be earlier than CreatedAt');
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Question_Keyword',
  });
  return Question_Keyword;
};