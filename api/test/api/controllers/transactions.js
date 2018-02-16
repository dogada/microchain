/* globals describe, it, beforeEach */
const expect = require('expect')
var request = require('supertest')
var server = require('../../../app')

describe('controllers', function () {
  beforeEach(async done => {
    // reset database state before each test
    await server.db.blocks.remove({})
    await server.ensureBlockchain()
    done()
  })

  describe('transactions', function () {
    describe('POST /transactions', function () {
      it('should reject invalid transaction', function (done) {
        request(server)
          .post('/v1/transactions')
          .send({})
          .set('Accept', 'application/json')
          .expect(400)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(err).toBe(null)
            expect(res.body.message).toMatch(/failed schema validation/)
            done()
          })
      })

      it('should accept valid transaction', function (done) {
        request(server)
          .post('/v1/transactions')
          .send({from: 'Alice', to: 'UncleBob', amount: 2})
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(err).toBe(null)
            let tx = res.body
            expect(tx.from).toBe('Alice')
            expect(tx.to).toBe('UncleBob')
            expect(tx.amount).toBe(2)
            done()
          })
      })
    })
  })
})
