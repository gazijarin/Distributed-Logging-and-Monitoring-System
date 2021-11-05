const Pool = require('pg').Pool
/**
 * Just creates a pool for connecting with the database and returns it. 
 */

const CreatePool = (config: any) => {
    const pool = new Pool({
        user: config.USERNAME,
        password: config.PASSWORD,
        host: 'log-database', 
        database: config.DB,
        port: config.DB_PORT,
    });
    return pool;
}

module.exports = {CreatePool};