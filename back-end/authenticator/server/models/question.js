'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.belongsTo(models.User, {foreignKey: 'author'});
      Question.belongsToMany(models.Keyword,{
        through: models.Question_Keyword,
        foreignKey: 'questionId'
      })
    }
  };
  Question.init({
    title: {
      type:DataTypes.TEXT,
      allowNull:false
    },
    body: {
      type:DataTypes.TEXT,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};