'use strict'

var SwaggerExpress = require('swagger-express-mw')
var app = require('express')()
module.exports = app // for testing

var config = {
  appRoot: __dirname // required config
}

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err }
  // add CORS headers to /v\d+/swagger url allow fetch from Swagger UI domain
  app.get('/v(:?\\d+)/swagger', enableCORS)
  // install middleware
  swaggerExpress.register(app)

  var port = process.env.PORT || 10010
  app.listen(port)
  if (swaggerExpress.runner.swagger.paths['/transactions']) {
    console.log(`Listening on port ${port}...`)
  }
})

// add required CORS headers
function enableCORS (request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  response.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type')
  response.header('Access-Control-Allow-Credentials', 'true')
  next()
}
