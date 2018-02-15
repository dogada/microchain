/* globals describe, it */
var should = require('should')
var request = require('supertest')
var server = require('../../../app')

describe('controllers', function () {
  describe('blocks', function () {
    describe('GET /blocks', function () {
      it('should return genesis block at beginning', function (done) {
        request(server)
          .get('/v1/blocks')
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            should.not.exist(err)
            res.body.should.have.length(1)
            done()
          })
      })
    })
  })
})
