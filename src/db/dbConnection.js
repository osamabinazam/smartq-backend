const { Sequelize } = require("sequelize");
const dbConfig = require("../config/dbConfig.js");

/**
 * Database connection configuration - Represents the connection to the postgres database.
 * @type {Sequelize} 
 * @export db
 */

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max || 5,
        min: dbConfig.pool.min || 1,
        acquire: dbConfig.pool.acquire || 30000,
        idle: dbConfig.pool.idle || 10000
    }
});

/**
 * Exporting the database connection configuration
 * @type {Sequelize}
 * @export db
 */
module.exports = db;
