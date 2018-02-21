'use strict'

const debug = require('debug')('microchain:app')
var SwaggerExpress = require('swagger-express-mw')
var app = require('express')()
const db = require('./api/helpers/db')
const {Block} = require('./api/helpers/block')

module.exports = app // for testing
app.db = db // for testing
app.ensureBlockchain = ensureBlockchain // for testing
app.set('trust proxy', 1) // https://expressjs.com/en/guide/behind-proxies.html

var config = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err }
  // add CORS headers to /v\d+/swagger url allow fetch from Swagger UI domain
  app.get('/v(:?\\d+)/swagger', enableCORS)
  // install middleware
  swaggerExpress.register(app)
  ensureBlockchain().then(() => {
    var port = process.env.PORT || 10010
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port)
      console.log(`Listening on port ${port}...`)
    } else {
      console.warn(`No listening to avoid conflicts with supertest!!!`)
    }
  })
})

async function ensureBlockchain () {
  let total = await db.blocks.count()
  debug('ensureBlockchain length', total)
  if (total === 0) {
    return Block.GENESIS.save()
  }
}

// add required CORS headers
function enableCORS (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  response.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type')
  response.header('Access-Control-Allow-Credentials', 'true')
  next()
}
