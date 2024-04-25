const { toDefaultValue } = require('sequelize/lib/utils');
const sequelize = require('../config/db');
const {Sequelize, DataTypes} = require("sequelize");

const UserSchema = sequelize.define("User",{
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true,
    },
    name : {
        type : DataTypes.STRING
    },
    email : {
        type:  DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    },
    role : {
        type : DataTypes.STRING,
        defaultValue : "user"
    }
});

sequelize.sync().then(()=>{
    console.log("User table created");
}).catch((err)=>{
    console.log("User table not created",err);
});

module.exports = UserSchema;