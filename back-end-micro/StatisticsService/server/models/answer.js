'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Answer.belongsTo(models.User,{foreignKey:{name:'userId', allowNull: false}})
    }
  };
  Answer.init({
    createdAt:{
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'Answer',
  });
  return Answer;
};