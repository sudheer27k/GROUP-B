const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes) =>{
    const admins  = sequelize.define("admins",{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email : {
            type:DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        password : {
            type:DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
       

    },
    {
        timestamps:false,
        createdAt :false,
        updatedAt:false
    }
    )

    return admins
}