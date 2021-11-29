const express = require('express')
const bodyParser = require('body-parser')
const { param } = require('express/lib/router')
const PORT = process.env.PORT || 3000
const PrismaClient = require('@prisma/client').PrismaClient
const prisma = new PrismaClient()

const app = express()
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({ message: 'Basic distributed logging server' })
})

async function saveLog (log) {
  let request_id
  if (isNaN(parseInt(log.request_id))) {
    request_id = null
  } else {
    request_id = parseInt(log.request_id)
  }
  return prisma.log.create({
    data: {
      message: log.message,
      logLevel: log.level,
      timestamp: log.timestamp,
      machineId: log.machine_id,
      requestId: request_id
    }
  })
}

app.post('/log', async (req, res) => {
  // TODO: add validation
  await saveLog(req.body)
  res.status(201).json(req.body)
})

app.get('/logs/search/all', async (req, res) => {
  // Returns all the log messages
  const logs = await prisma.log.findMany()
  res.json(logs)
})

app.get('/logs/search/machine_id', async (req, res) => {
  if (!req.query.machine_id) {
    res.status(400).json({ message: 'machine_id is required' })
    return
  }
  const logs = await prisma.log.findMany({
    where: {
      machineId: req.query.machine_id
    }
  })
  res.json(logs)
})

app.get('/logs/search/time_period', async (req, res) => {
  if (!valid_date_range(req)) {
    res.status(400).json({ message: 'from and to must both be present or neither be present' }).send()
    return
  }
  let where_clause = {}
  if (req.query.from !== undefined) {
    where_clause = {
      timestamp: {
        gte: new Date(req.query.from),
        lte: new Date(req.query.to)
      }
    }
  }
  const logs = await prisma.log.findMany({
    where: where_clause
  })
  res.json(logs)
})

app.get('/logs/search/message', async (req, res) => {
  const logs = await prisma.log.findMany({
    where: {
      message: {
        contains: req.query.message,
        mode: 'insensitive'
      }
    }
  })
  res.json(logs)
})

app.get('/logs/search/request_id', async (req, res) => {
  if (!req.query.request_id) {
    res.status(400).json({ message: 'request_id is required' })
    return
  }
  const logs = await prisma.log.findMany({
    where: {
      requestId: parseInt(req.query.request_id)
    }
  })
  res.json(logs)
})

app.get('/logs/search/level', async (req, res) => {
  // TODO: should make this be able to search for multiple log levels
  if (!req.query.level) {
    res.status(400).json({ message: 'level is required' })
  }
  const logs = await prisma.log.findMany({
    where: {
      logLevel: req.query.level
    }
  })
  res.json(logs)
})

app.get('/logs/search', async (req, res) => {
  // generic search that can receive multiple parameters and parse them appropriately
  let where_clause = {}
  if (valid_date_range(req)) {
    if (req.query.from !== undefined) {
      where_clause = {
        timestamp: {
          gte: new Date(req.query.from),
          lte: new Date(req.query.to)
        }
      }
    }
  } else {
    res.status(400).json({ message: 'from and to must both be present or neither be present' }).send()
    return
  }
  if (req.query.machine_id) {
    where_clause.machineId = req.query.machine_id
  }
  if (req.query.level) {
    where_clause.logLevel = req.query.level
  }
  if (req.query.message) {
    where_clause.message = {
      contains: req.query.message,
      mode: 'insensitive'
    }
  }
  if (req.query.request_id) {
    where_clause.requestId = parseInt(req.query.request_id)
  }

  const logs = await prisma.log.findMany({
    where: where_clause
  })
  res.json(logs)
}
)

function valid_date_range (req) {
  const from_undefined = (req.query.from === undefined)
  const to_undefined = (req.query.to === undefined)
  return from_undefined === to_undefined
}

server = app.listen(PORT, () => {
  console.log(`log collection server running at http://localhost:${PORT}`)
})
module.exports = { server: server, app: app, prisma: prisma }
