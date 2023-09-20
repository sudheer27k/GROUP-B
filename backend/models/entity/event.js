const { DataTypes } = require("sequelize");
const { sequelize } = require(".");


module.exports = (sequelize,DataTypes) =>{
    const events  = sequelize.define("events",{
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
        venue : {
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
        },

        start_time : {
            type:DataTypes.TIME,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        end_time : {
            type:DataTypes.TIME,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
            validate: {
              notEmpty: true
            }
          }
          

    },
   
    {
        timestamps:false,
        createdAt :false,
        updatedAt:false
    }
    )

    return events
}