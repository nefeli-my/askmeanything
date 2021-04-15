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
      Question_Keyword.belongsTo(models.Keyword, {foreignKey: 'keywordId'})
      Question_Keyword.belongsTo(models.Question, {foreignKey: 'questionId'})
    }
  };
  Question_Keyword.init({
    sequence: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Question_Keyword',
  });
  return Question_Keyword;
};