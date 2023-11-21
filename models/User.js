const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
//Password hashing
const bcrypt = require('bcrypt');

//Uses sequelize extending model method, checks if password hash matches using compareSync
class User extends Model {
    async verifyPassword(loginPw) {
        console.log(this.password, ':D');
      return bcrypt.compareSync(loginPw, this.password);
    }
  }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type:DataTypes.STRING,
            allowNull: false,
        }
    },   
    {
    //Hooks perform actions before or after calls in sequelize are executed to the database
    hooks: {
        //beforeCreate works with data before a new instance is created 
        beforeCreate: async (newUserData) => {
        //This creates a secure password hash. The number 12 is the default number of salt rounds, or how much time is needed to calculate a single hash.
        newUserData.password = await bcrypt.hash(newUserData.password, 12);
        return newUserData;
        },
        //beforeUpdate works with the data before updating the database
        beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 12);
        return updatedUserData;
        },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    }
); 

module.exports = User;