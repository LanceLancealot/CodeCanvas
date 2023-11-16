const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/connection');
//Password hashing
const bcrypt = require('bcrypt');

//Uses sequelize extending model method, checks if password hash matches using compareSync
class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        code: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        public: {
            type:DataTypes.BOOLEAN,
            allowNull: false,
        },
        //id key will be used to join tables
        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
        },
    },   
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
    }
); 

module.exports = Post;