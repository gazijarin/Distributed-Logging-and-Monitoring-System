const request = require('supertest');

describe('loading express', function () {
  let server

  before(function (done){
    server = require('../server/server').server
    done()
  });
  after(function (done){
    server.close()
    done()
  })

  it('responds to /', function testSlash(done) {
    request(server)
      .get('/')
      .expect(200, done);
  });
  it('tells you the time', function testGetTime(done){
    request(server)
      .get('/current_time')
      .expect(200, done);
  })
  it('404 everything else', function testPath(done) {
    request(server)
      .get('/foo/bar')
      .expect(404, done);
  });
});