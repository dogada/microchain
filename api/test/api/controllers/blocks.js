/* globals describe, it */
const expect = require('expect')
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
            expect(err).toBe(null)
            console.log('body', res.body)
            expect(res.body).toHaveLength(1)
            let block = res.body[0]
            expect(block.index).toBe(0)
            expect(block.data['proof-of-work']).toBe(0)
            done()
          })
      })
    })
  })
})
