'use strict'

const debug = require('debug')('microchain:transactions')
const {asyncController} = require('../helpers/async')
const buffer = require('../helpers/buffer')
const db = require('../helpers/db')

/**
 * Return list of transactions with enclosing blocks references.
 */
async function get (req, res) {
  let account = req.swagger.params.account.value
  let items = await db.blocks.aggregate([
    {
      $unwind: {
        path: '$data.transactions',
        includeArrayIndex: 'position'
      }
    },
    {
      $match: {
        $or: [
          {'data.transactions.from': account},
          {'data.transactions.to': account}
        ]
      }
    },
    {
      $project: {
        _id: 0,
        block: {
          index: '$_id',
          timestamp: '$timestamp',
          hash: '$hash'
        },
        position: 1,
        from: '$data.transactions.from',
        to: '$data.transactions.to',
        amount: '$data.transactions.amount'
      }
    }
  ])
  res.json({
    items
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
