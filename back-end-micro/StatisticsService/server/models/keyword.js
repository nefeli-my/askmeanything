'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keyword extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Keyword.belongsToMany(models.Question,{
          through: models.Question_Keyword,
          foreignKey: 'keywordId'
        })
    }
  };
  Keyword.init({
    word: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        is: /^[a-zA-Z0-9]+[\-]?[a-zA-Z0-9]+$/i
      }
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'Keyword',
  });
  return Keyword;
};