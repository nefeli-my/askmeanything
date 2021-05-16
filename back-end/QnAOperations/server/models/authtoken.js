'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AuthToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      AuthToken.belongsTo(models.User,{foreignKey: {name: 'userId', allowNull: false}});
    }
  };
  AuthToken.init({
    tokenstr: {
      type:DataTypes.STRING,
      allowNull:false,
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
    modelName: 'AuthToken',
  });
  return AuthToken;
};