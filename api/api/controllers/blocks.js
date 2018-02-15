'use strict'

const debug = require('debug')('microchain:blocks')
const crypto = require('crypto')
const db = require('../helpers/db')
const {asyncController} = require('../helpers/async')

let blockchain = []

function updateHash (block, prevHash) {
  let hash = crypto.createHash('sha256')
  hash.update(`${block.index}${block.timestamp}`)
  hash.update(JSON.stringify(block.data))
  hash.update(prevHash)
  block.hash = hash.digest('hex')
  return block
}

async function get (req, res) {
  let blocks = await db.blocks.find({})
  debug('Blockchain length', blocks.length)
  res.json(blocks)
}

async function mine (req, res) {
  let block = updateHash({
    index: blockchain.length,
    timestamp: new Date().toISOString(),
    data: {
      transactions: [],
      'proof-of-work': 1
    }
  }, '0')
  blockchain.push(block)
  res.status(201)
  res.json(block)
}

module.exports = {
  get: asyncController(get),
  mine: asyncController(mine)
}
