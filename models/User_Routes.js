// import Model Class and Datatypes from sequelize
const { Model, DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

// create the User Model - inherits from Model
class User_Routes extends Model {};

// define User_Routes table columns and configuration
User_Routes.init(
    {
    // USER_ROUTE TABLE column definition
    
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    // submitted photo
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ride_time: {
        // HH:MM:SS
        type: DataTypes.TIME,
        allowNull: false,
    },
    ride_link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date_completed: {
        // YYYY-MM-DD
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    date_submitted: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ride_points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    bonus_points: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        defaultValue: 0
    },
    approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    // route id from RideWithGPS routes (41552966)
    route_id: {
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
        modelName: 'user_routes'
    }
);

module.exports = User_Routes;