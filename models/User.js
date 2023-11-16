const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
//Password hashing
const bcrypt = require('bcrypt');

//Uses sequelize extending model method, checks if password hash matches
class User extends Model {
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primary key: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    }
);    

module.exports = User;