'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Question, {foreignKey: { name: 'author', allowNull: false}})
      User.hasMany(models.Answer, {foreignKey: {name: 'userId', allowNull: false}})
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      unique : true,
      allowNull: false,
      validate: {
        notContains: ' ',
        isAlphanumeric: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull :false,
      validate: {
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
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
    modelName: 'User',
  });
  return User;
};