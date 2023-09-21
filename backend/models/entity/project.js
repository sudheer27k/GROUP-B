const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes) =>{
    const projects = sequelize.define("projects",{
       
        id : {
            type:DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true,
            autoIncrement: true,
            validate : {
                notEmpty : true,
            }
            
        },
        project_name : {
            type:DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        start_date : {
            type:DataTypes.DATEONLY,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },

        end_date : {
            type:DataTypes.DATEONLY,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        client_name : {
            type:DataTypes.STRING,
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

    return projects
}