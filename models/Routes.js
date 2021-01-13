// import Model Class and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the User Model - inherits from Model
class Routes extends Model {};

// define Routes table columns and configuration
Routes.init(
    {
        // TABLE column definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,        
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,  
        },
        mileage: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        elevation: {
            type: DataTypes.FLOAT,
            allowNull:false
        },
        points: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        first_bonus: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
    // TABLE CONFIGURATION OPTIONS
        
    // pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so our model name stays lowercase in the database
    modelName: 'routes'
    }
);

module.exports = Routes;