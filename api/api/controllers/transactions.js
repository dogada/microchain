'use strict'

const debug = require('debug')('microchain:transactions')
const {asyncController} = require('../helpers/async')
const buffer = require('../helpers/buffer')

async function get (req, res) {
  // let account = req.swagger.params.account.value
  res.json({
    items: buffer.getAllTransactions()
  })
}

async function post (req, res) {
  let transaction = req.swagger.params.body.value
  debug('post', transaction)
  buffer.addTransaction(transaction)
  res.status(201)
  res.json(transaction)
}

module.exports = {
  get: asyncController(get),
  post: asyncController(post)
}
