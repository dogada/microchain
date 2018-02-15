/* globals describe, it */
const expect = require('expect')
const {asyncController} = require('../../../api/helpers/async')

describe('helpers', function () {
  describe('async', function () {
    describe('asyncController', function () {
      it('should wrap async route handler in a function', function (done) {
        async function handler (req, res) {
          expect(req).toBe(1)
          expect(res).toBe(2)
          await Promise.resolve({})
          done()
        }
        let wrapped = asyncController(handler)
        expect(typeof wrapped).toEqual('function')
        wrapped(1, 2) // should call handler and done or fail with timeout
      })
    })
  })
})
