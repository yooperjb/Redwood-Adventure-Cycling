// import the Sequelize class constructor from the library
const Sequelize = require('sequelize');
require('dotenv').config();

// create connection to our db
let sequelize;

// Sets up sequelize for JAWSDB or Localhost
if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    // If using local db - use .env variables to keep private
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}

module.exports = sequelize;