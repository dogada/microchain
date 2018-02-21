'use strict'

const debug = require('debug')('microchain:transactions')
const {asyncController} = require('../helpers/async')
const buffer = require('../helpers/buffer')
const db = require('../helpers/db')

const DEFAULT_TRANSACTIONS_COUNT = 100
/**
 * Return last transactions for given address.
 */
async function get (req, res) {
  let account = req.swagger.params.account.value
  let count = req.swagger.params.count.value || DEFAULT_TRANSACTIONS_COUNT
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
      $sort: {
        _id: -1
      }
    },
    {
      $limit: count
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
