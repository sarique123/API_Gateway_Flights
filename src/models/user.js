'use strict';
const {
  Model
} = require('sequelize');

const {ServerConfig} = require('../config');
const bcrypt  = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8,30],
        isStrongPassword(value){
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]+$/;
          if(!regex.test(value)){
            throw new Error(
              'Password must contain at least one lowercase letter, one uppercase letter, one special character, and one digit.'
            );
          }
        },
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(function encrypt(user) {
    const encryptedPassword = bcrypt.hashSync(user.password , +ServerConfig.SALT_ROUNDS);
    user.password = encryptedPassword;
  })
  return User;
};