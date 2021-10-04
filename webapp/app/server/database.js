const Pool = require('pg').Pool
const config = require('./environment')
const pool = new Pool({
  user: config.db.username,
  password: config.db.password,
  host: 'webapp-database', // TODO: setup env for docker
  database: config.db.database,
  port: 5432,
})

module.exports = {pool: pool}