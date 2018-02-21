/* globals describe, it */
const expect = require('expect')
const {asyncController} = require('../../../api/helpers/async')

describe('helpers', function () {
  describe('async', function () {
    describe('asyncController', function () {
      it('should wrap async route handler in a function', function (done) {
        let fakeRequest = {}
        let fakeResponse = {
          status () {},
          json () {}
        }
        async function handler (req, res) {
          expect(req).toBe(fakeRequest)
          expect(res).toBe(fakeResponse)
          await Promise.resolve({})
          done()  // should call handler and done or fail with timeout
        }
        let wrapped = asyncController(handler)
        expect(typeof wrapped).toEqual('function')
        wrapped(fakeRequest, fakeResponse)
      })

      it('should catch errors in async route', async function (done) {
        let fakeRequest = {}
        let fakeResponse = {
          status () {},
          json () {}
        }
        async function handler (req, res) {
          expect(req).toBe(fakeRequest)
          expect(res).toBe(fakeResponse)
          throw new Error('Test error')
        }
        let wrapped = asyncController(handler)
        try {
          await wrapped(fakeRequest, fakeResponse)
          done()
        } catch (e) {
          // we should not reach here, but if we're here fail test
          // expect(e).toBe(undefined)
          done(new Error('Error in handler isn\'t caught'))
        }
      })
    })
  })
})
