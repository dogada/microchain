'use strict'

const debug = require('debug')('microchain:blocks')
const db = require('../helpers/db')
const {asyncController} = require('../helpers/async')
const {Block} = require('../helpers/block')
const buffer = require('../helpers/buffer')

const NETWORK_ACCOUNT = 'network'
const MINER_BONUS = 1

async function get (req, res) {
  let since = req.swagger.params.since.value
  let count = req.swagger.params.count.value
  let blocks = await db.blocks.find({
    _id: {$gt: since}
  }, {
    sort: {_id: -1},
    limit: count
  })
  debug('get blockchain length', blocks.length)
  blocks = blocks.map(Block.fromJSON)
  res.json(blocks.map(b => b.toJSON()))
}

function getNewBlockTransactions (miner) {
  return [
    ...buffer.getAllTransactions(),
    {
      from: NETWORK_ACCOUNT,
      to: miner.account,
      amount: MINER_BONUS
    }
  ]
}

async function mine (req, res) {
  let miner = req.swagger.params.body.value
  let total = await db.blocks.count()
  debug('Current blockchain length', total)
  let lastBlock = Block.fromJSON(await db.blocks.findOne({}, {sort: {_id: -1}}))
  debug('mine lastBlock', lastBlock)
  let newBlock = new Block({index: lastBlock.index + 1})
  newBlock.data.setTransactions(getNewBlockTransactions(miner))
  newBlock.data.findProofOfWork(lastBlock)
  newBlock.updateHash(lastBlock)
  let doc = await db.blocks.insert(newBlock.toJSON('_id'))
  if (doc._id) {
    // remove all just added transactions
    buffer.reset()
  }
  res.status(201)
  res.json(Block.fromJSON(doc).toJSON())
}

module.exports = {
  get: asyncController(get),
  mine: asyncController(mine)
}
