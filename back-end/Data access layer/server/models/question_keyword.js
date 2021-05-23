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
  Question_Keyword.init({},
      {
        timestamps: false,
        sequelize,
        modelName: 'Question_Keyword',
      });
  return Question_Keyword;
};