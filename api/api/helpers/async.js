function errorHandler (res) {
  return e => {
    res.status(500)
    res.json({
      message: e.message || 'Unknown error'
    })
  }
}

/**
 * Workaround for swagger-node that doesn't support async controllers yet.
 * @param {function} handler - function that accepts (req, res) and returns a promise
 */
function asyncController (handler) {
  return (req, res) => {
    handler(req, res)
      .then() // if there is no error handler already sent data
      .catch(errorHandler(res))
  }
}

module.exports = {
  asyncController
}
