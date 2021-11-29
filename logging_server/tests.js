const request = require('supertest')
const expect = require('chai').expect

const log_1 = {
  message: 'test message 1',
  logLevel: 'INFO',
  machineId: 'test-machine-1',
  requestId: 12345
}
const log_2 = {
  message: 'test message 2',
  logLevel: 'ERROR',
  machineId: 'test-machine-2',
  requestId: 12346
}
describe('loading express', function () {
  let server
  let prisma

  before(function (done) {
    server = require('./app').server
    prisma = require('./app').prisma
    prisma.log.deleteMany({})
    done()
  })
  beforeEach(async function () {
    return await prisma.log.deleteMany({})
  })
  after(async function () {
    server.close()
    return await prisma.$disconnect()
  })

  async function add_default_data () {
    await prisma.log.createMany({
      data: [
        log_1,
        log_2
      ]
    })
  }

  it('responds to /', (done) => {
    request(server)
      .get('/')
      .expect(200, done)
  })
  it('posts to /log with all information', (done) => {
    const message = {
      message: 'test message',
      level: 'INFO',
      machine_id: 'test-machine-id',
      request_id: '12345',
      id: 213,
      timestamp: '2020-01-01T00:00:00.000Z'
    }
    request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201)
      .then(res => {
        expect(res.body).to.deep.equal(message)
        done()
      })
  })
  it('posts to /log with just message', async () => {
    const message = {
      message: 'just message'
    }
    return await request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201)
  })
  it('gets no messages', async () => {
    return await request(server)
      .get('/logs/search/all')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.equal(0)
      })
  })
  it('gets 2 messages', async () => {
    await add_default_data()

    return await request(server)
      .get('/logs/search/all')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        for (let i = 0; i < res.body.length; i++) {
          delete res.body[i].id
          delete res.body[i].timestamp
        }
        expect(res.body.length).to.equal(2)
        expect(res.body).to.be.an('array')
        expect(res.body).to.deep.include(log_1)
        expect(res.body).to.deep.include(log_2)
      })
  })
  it('searches by machine_id', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/machine_id')
      .query({
        machine_id: 'test-machine-1'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
  it('search with missing machine_id', async () => {
    return await request(server)
      .get('/logs/search/machine_id')
      .query({})
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('searches by empty time period', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/time_period')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
      })
  })
  it('searches by specific time period', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/time_period')
      .query({
        from: '2021-01-01',
        to: '2022-01-01'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
      })
  })
  it('denies badly formed time period', async () => {
    return await request(server)
      .get('/logs/search/time_period')
      .query({
        from: '2021-01-01'
      })
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('searches by specific message', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/message')
      .query({
        message: 'test message'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
      })
  })
  it('searches with no message', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/message')
      .query({})
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body.length).to.equal(2)
      })
  })
  it('searches by request id', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/request_id')
      .query({
        request_id: '12345'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
  it('searches with no request id', async () => {
    return await request(server)
      .get('/logs/search/request_id')
      .query({})
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('searches by level', async () => {
    await add_default_data()
    await request(server)
      .get('/logs/search/level')
      .query({
        level: 'INFO'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
  it('searches with no level', async () => {
    return await request(server)
      .get('/logs/search/level')
      .query({})
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('search by machine_id and time period', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/')
      .query({
        machine_id: 'test-machine-1',
        from: '2021-01-01',
        to: '2022-01-01'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
  it('searched by nothing', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/')
      .query({})
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(2)
      })
  })
  it('searches by everything', async () => {
    await add_default_data()
    return await request(server)
      .get('/logs/search/')
      .query({
        machine_id: 'test-machine-1',
        from: '2021-01-01',
        to: '2022-01-01',
        message: 'test message',
        request_id: '12345',
        level: 'INFO'
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
  it('searched by everything with bad date range', async () => {
    return await request(server)
      .get('/logs/search/')
      .query({
        machine_id: 'test-machine-1',
        from: '2021-01-01',
        message: 'test message',
        request_id: '12345',
        level: 'INFO'
      })
      .expect('Content-Type', /json/)
      .expect(400)
  })
  it('tests posting and then retrieving a message', async () => {
    const message = {
      message: 'test message',
      level: 'INFO',
      machine_id: 'test-machine-id',
      request_id: 12345,
      timestamp: '2020-01-01T00:00:00.000Z'
    }
    await request(server)
      .post('/log')
      .send(
        message
      )
      .expect('Content-Type', /json/)
      .expect(message)
      .expect(201)
      .then(res => {
        expect(res.body).to.deep.equal(message)
      })
    return await request(server)
      .get('/logs/search/')
      .query({
        message: 'test',
        level: 'INFO',
        machine_id: 'test-machine-id',
        request_id: '12345'
      })
      .expect(200)
      .then(res => {
        expect(res.body.length).to.equal(1)
      })
  })
})
