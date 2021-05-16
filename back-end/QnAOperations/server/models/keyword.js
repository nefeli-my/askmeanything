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
        Keyword.belongsToMany(models.Question,{through: models.Question_Keyword, foreignKey: 'keywordId'})
    }
  };
  Keyword.init({
    word: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate: {
        isAlphanumeric: true,
        notContains: ' '
      }
    },
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
    modelName: 'Keyword',
  });
  return Keyword;
};