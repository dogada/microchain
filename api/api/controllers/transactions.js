'use strict'

const debug = require('debug')('microchain:transactions')
const tv4 = require('tv4')
const buffer = require('../helpers/buffer')
const TransactionSchema = require('../../shared/schemas/transaction.json')

function get (req, res) {
  // let account = req.swagger.params.account.value
  res.json({
    items: buffer.getAllTransactions()
  })
}

function post (req, res) {
  let transaction = req.swagger.params.body.value
  let result = tv4.validateResult(transaction, TransactionSchema)
  debug('post', transaction, result)
  if (result.valid) {
    buffer.addTransaction(transaction)
    res.status(201)
    res.json(transaction)
  } else {
    let message = result.error ? result.error.message : 'Unknown error'
    res.status(400)
    res.json({message})
  }
}

module.exports = {
  get,
  post
}
