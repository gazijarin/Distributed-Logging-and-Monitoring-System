const express = require('express')
const app = express()
const config = require('./environment')
const PORT = process.env.PORT || 3001
const axios = require('axios')
const { v4: uuidv4 } = require('uuid')

app.get('/', (req, res) => {
  res.send('Dummy Webapp for creating logs')
})

// This function gets called by the other log_creator
app.get('/current_time', (req, res) => {
  const request_id = req.query.request_id
  const date = new Date()
  date.toISOString()
  sendLogMessage('Responding to request for current time', request_id)
  res.send(date)
})

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the server!' })
})

function sendGetTimeRequest () {
  const request_id = uuidv4()
  axios
    .get(config.webapp.send_to_url + 'current_time', {
      params: {
        request_id: request_id
      }
    })
    .then(function (response) {
      sendLogMessage('Successfully got current time', request_id)
    })
    .catch(function (error) {
      sendLogMessage('Failed to get current time', request_id)
    })
}

function sendLogMessage (message, request_id) {
  const log_message = {
    message: message,
    level: 'DEBUG',
    machineId: `log_creator_${PORT}`,
    request_id: request_id
  }
  axios
    .post(
      config.webapp.logging_url + 'log',
      log_message,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    .then(function (response) {
      // console.log(response.data)
    })
    .catch(function (error) {
      // console.log(error)
    })
}

const _ = setInterval(sendGetTimeRequest, 10000)

server = app.listen(PORT, () => {
  console.log(`log_creator running at http://localhost:${PORT}`)
})
module.exports = { server: server, app: app }
