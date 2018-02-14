'use strict'

function get (req, res) {
  let account = req.swagger.params.account.value
  console.log('account', account)
  res.json({
    items: [
      {
        from: account,
        to: account,
        amount: 34
      }
    ]
  })
}

function post (req, res) {
  let body = req.swagger.params.body.value
  console.log('body', body)
  res.status(201)
  res.json(body)
}

module.exports = {
  get,
  post
}
