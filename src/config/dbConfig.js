

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
 * @export dbConfig

 */
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER ||'postgres',
    password: process.env.DB_PASS ||  'toor',
    database: process.env.DB_NAME || 'smartq_db',
    dialect: process.env.DB_DIALECT || 'postgres',
    pool: {
        max: 5,
        min: 1, 
        acquire: 30000,
        idle:  10000
    }
};


/**
 * Exporting the database configuration object
 * @type {dbConfig}
 * @export dbConfig
 */
export default dbConfig;