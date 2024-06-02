// require('dotenv').config();
const Sequelize = require('sequelize');

/**
 * Database configuration object
 * @type {Object}
 * @property {String} host - The host of the database.
 * @property {String} user - The user of the database.
 * @property {String} password - The password of the database.
 * @property {String} database - The name of the database.
 * @property {String} dialect - The dialect of the database.
 * @property {Object} pool - The pool configuration of the database.
 * @property {Number} pool.max - The maximum number of connection in the pool.
 * @property {Number} pool.min - The minimum number of connection in the pool.
 * @property {Number} pool.acquire - The maximum time, in milliseconds, that pool will try to get connection before throwing error.
 * @property {Number} pool.idle - The maximum time, in milliseconds, that a connection can be idle before being released.
 * @exports dbConfig
 */
const dbConfig = {
    host: process.env.DB_HOST || 'ep-cold-firefly-a1ys0sj3-pooler.ap-southeast-1.aws.neon.tech',
    user: process.env.DB_USER || 'default',
    password:process.env.DB_PASS || 'dJ7tR3UPSKwh',
    database: process.env.DB_NAME || 'verceldb',
    dialect: process.env.DB_DIALECT || 'postgres',
    dialectOptions: {
      ssl: 'true' ? {
          require: true,
          rejectUnauthorized: false
      } : false
  },
    pool: {
        max: 10,
        min: 1, 
        acquire: 30000,
        idle:  10000
    },
    retry: {
        match: [
          Sequelize.ConnectionError,
          Sequelize.ConnectionRefusedError,
          Sequelize.ConnectionTimedOutError,
          'ECONNRESET'
        ],
        max: 5
        }
};

/**
 * Exporting the database configuration object
 * @type {dbConfig}
 * @exports dbConfig
 */

console.log("Database Config is :\n", dbConfig)
module.exports = dbConfig;
