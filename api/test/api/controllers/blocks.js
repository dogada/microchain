/* globals describe, it, beforeEach */
const expect = require('expect')
var request = require('supertest')
var server = require('../../../app')

// TODO: load test blockchain from a fixture
describe('controllers', function () {
  beforeEach(async done => {
    // reset database state before each test
    await server.db.blocks.remove({})
    await server.ensureBlockchain()
    done()
  })

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
            expect(res.body).toHaveLength(1)
            let block = res.body[0]
            expect(block.index).toBe(0)
            expect(block.data['proof-of-work']).toBe(0)
            done()
          })
      })

      it('should take into account ?count parameter', function (done) {
        request(server)
          .get('/v1/blocks')
          .query({since: 0})
          .set('Accept', 'application/json')
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(err).toBe(null)
            expect(res.body).toHaveLength(0)
            done()
          })
      })
    })

    describe('POST /blocks', function () {
      it('should reject invalid mainer account', function (done) {
        request(server)
          .post('/v1/blocks')
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

      it('should mine valid block and send to the miner a bonus', function (done) {
        request(server)
          .post('/v1/blocks')
          .send({account: 'MinerAccount'})
          .set('Accept', 'application/json')
          .expect(201)
          .expect('Content-Type', /json/)
          .end(function (err, res) {
            expect(err).toBe(null)
            let block = res.body
            expect(block.index).toBe(1)
            expect(block.data['proof-of-work']).toBe(9)
            expect(block.data.transactions).toHaveLength(1)
            let tx = block.data.transactions[0]
            expect(tx.from).toBe('network')
            expect(tx.to).toBe('MinerAccount')
            expect(tx.amount).toBe(1)
            done()
          })
      })
    })
  })
})
