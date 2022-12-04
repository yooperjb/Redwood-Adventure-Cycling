// This file creates a connection to the MySQL Database
// import the Sequelize class constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to our db
let sequelize;

// Sets up sequelize for Railway or Localhost
if (process.env.RAILWAY_ENVIRONMENT) {
    sequelize = new Sequelize(process.env.MYSQL_URL);
} else if (process.env.STATUS === 'development' ){
    // If using local db - use .env variables to keep private
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
} else {
    // For production site on Dreamhost process.env.STATUS === 'production'
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'add this',
        dialect: 'mysql',
        port: 'addthis'
    });
}

module.exports = sequelize;