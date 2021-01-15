// import Model Class and Datatypes from sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the User Model - inherits from Model
class User extends Model {};

// define User table columns and configuration
User.init(
    {
    // USER TABLE column definitions
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: false
        },
        // This info is not needed for passport-strava. Keeping it here in case we jump ship. 
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // f_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // l_name: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        // gender: {
        //     type: DataTypes.STRING,
        // },
        // email: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isEmail: true
        //     }
        // },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         len: [6]
        //     }
        // },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        modelName: 'user'
    }
);

module.exports = User;