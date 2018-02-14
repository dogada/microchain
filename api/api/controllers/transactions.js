'use strict'

function get (req, res) {
  let account = req.swagger.params.account.value
  res.json({
    items: [
      {
        from: account,
        to: account,
        amount: 42
      }
    ]
  })
}

function post (req, res) {
  let body = req.swagger.params.body.value
  res.status(201)
  res.json(body)
}

module.exports = {
  get,
  post
}
