const Pool = require('pg').Pool
// Should be changed to use a config file
const pool = new Pool({
  user: 'demetre',
  host: 'localhost',
  database: 'teamrocket',
  password: 'password',
  port: 5432,
})

