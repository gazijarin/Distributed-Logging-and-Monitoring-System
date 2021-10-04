// this has to be first, needed for db connection
const express = require('express')
const app = express()
const port = 3000
const db = require('./database')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/check-db-connection', (req, res) => {
  db.pool.connect((err, client, release) => {
    if (err) {
      res.send("Error acquiring client")
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        res.send("Error Executing query")
      }
      res.send(result.rows)
    })
  })
})

server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = {server: server, app:app}
