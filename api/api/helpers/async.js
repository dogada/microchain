/**
 * Workaround for swagger-node that doesn't support async controllers yet.
 * @param {function} handler - function that accepts (req, res) and returns a promise
 */
function asyncController (handler) {
  return (req, res) => handler(req, res).then()
}

module.exports = {
  asyncController
}
