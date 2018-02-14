'use strict'

const crypto = require('crypto')

let blockchain = []

function updateHash (block, prevHash) {
  let hash = crypto.createHash('sha256')
  hash.update(`${block.index}${block.timestamp}`)
  hash.update(JSON.stringify(block.data))
  hash.update(prevHash)
  block.hash = hash.digest('hex')
  return block
}

function get (req, res) {
  res.json(blockchain)
}

function mine (req, res) {
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
  get,
  mine
}
