const { DataTypes } = require("sequelize");
const { sequelize } = require("."); // Make sure to import your Sequelize instance correctly

module.exports = (sequelize, DataTypes) => {
  const UserProject = sequelize.define(
    "user_project",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,// This field will be part of the composite primary key
        validate: {
          notEmpty: true,
        },
        references: {
          model: "users", // Replace with the actual name of the user table
          key: "id", // Replace with the actual primary key of the user table
        },
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,// This field will be part of the composite primary key
        validate: {
          notEmpty: true,
        },
        references: {
          model: "projects", // Replace with the actual name of the project table
          key: "id", // Replace with the actual primary key of the project table
        },
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  // Define the many-to-many association
  UserProject.associate = (models) => {
    UserProject.belongsTo(models.users, {
      foreignKey: "user_id",
      onDelete: "CASCADE", // You can adjust this as needed
    });

    UserProject.belongsTo(models.projects, {
      foreignKey: "project_id",
      onDelete: "CASCADE", // You can adjust this as needed
    });
  };

  return UserProject;
};
