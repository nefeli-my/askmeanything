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
      Question.belongsTo(models.User, {as:'Author',foreignKey: { name: 'author', allowNull: false}});
      Question.belongsToMany(models.Keyword,{
        through: models.Question_Keyword,
        foreignKey: 'questionId'
      })
      Question.hasMany(models.Answer, {foreignKey:{ name: 'questionId', allowNull: false}})
    }
  };
  Question.init({
    title: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate: {
      }
    },
    body: {
      type:DataTypes.TEXT,
      allowNull:false,
      validate: {
      }
    },
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Question',
  });
  return Question;
};
