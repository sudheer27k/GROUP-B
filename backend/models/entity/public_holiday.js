const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes) =>{
    const holidays  = sequelize.define("holidays",{
        id : {
            type:DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement: true,
            validate : {
                notEmpty : true,
            }
            
        },
        name : {
            type:DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        description : {
            type:DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        date : {
            type:DataTypes.DATEONLY,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
       
    },
    {
        timestamps:false,
        createdAt :false,
        updatedAt:false
    }
    )

    return holidays
}