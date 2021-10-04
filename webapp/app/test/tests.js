const request = require('supertest');

describe('loading express', function () {
  let server

  before(function (done){
    server = require('../server/server').server
    done()
  });
  after(function (done){
    server.close()
    // need to close the connection pool otherwise the tests don't exit
    let pool = require('../server/database').pool
    pool.end()
    done()
  })

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('connects to database', function testConnection(done){
    request(server)
      .get('/check-db-connection')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});