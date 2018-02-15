'use strict'

const debug = require('debug')('microchain:blocks')
const db = require('../helpers/db')
const {asyncController} = require('../helpers/async')
const {Block} = require('../helpers/block')

let blockchain = []

async function get (req, res) {
  let blocks = await db.blocks.find({})
  debug('get blockchain length', blocks.length)
  blocks = blocks.map(Block.fromJSON)
  res.json(blocks.map(b => b.toJSON()))
}

async function mine (req, res) {
  let block = new Block({
    index: blockchain.length,
    timestamp: new Date().toISOString(),
    data: {
      transactions: [],
      'proof-of-work': 1
    }
  })
  block.updateHash('0')
  blockchain.push(block)
  res.status(201)
  res.json(block)
}

module.exports = {
  get: asyncController(get),
  mine: asyncController(mine)
}
