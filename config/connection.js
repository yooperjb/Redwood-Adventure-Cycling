// This file creates a connection to the MySQL Database
// import the Sequelize class constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to our db
let sequelize;

// Sets up sequelize for Railway/localhost/Dreamhost
if (process.env.RAILWAY_ENVIRONMENT) {
    sequelize = new Sequelize(process.env.MYSQL_URL);
}
else if ( process.env.STATUS === 'production') {
    // For 'production' site on Dreamhost -make sure .env file matches
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DH_DB_USER, process.env.DH_DB_PW, {
        host: 'mysql.redwoodadventurecycling.com',
        dialect: 'mysql',
        port: 3306
    })
}
else {
    // If using local mySQL db
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;