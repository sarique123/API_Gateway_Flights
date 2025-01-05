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
          const regex = /^(?=.*[A-Z])(?=.*\d)(?=.[@$!#%&?*])[A-Za-z\d@$!%*?&#]+$/;
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
  return User;
};