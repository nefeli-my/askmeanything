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
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'User',
  });
  return User;
};