const Pool = require('pg').Pool
// Should be changed to use a config file
const pool = new Pool({
  user: 'postgres',
  password: 'password',
  host: 'webapp-database',
  database: 'db',
  port: 5432,
})

module.exports = {pool: pool}