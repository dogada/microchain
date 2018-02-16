const debug = require('debug')('microchain:block')
const crypto = require('crypto')
const db = require('./db')

class BlockData {
  constructor ({transactions, proofOfWork} = {}) {
    this.transactions = transactions || []
    this.proofOfWork = proofOfWork || 0
  }

  setTransactions (transactions) {
    this.transactions = transactions
  }

  // find and update proof-of-work
  findProofOfWork (previousBlock) {
    let lastProof = previousBlock.data.proofOfWork
    let proof = lastProof + 1
    while (proof % 9 !== 0 && proof % lastProof !== 0) {
      proof += 1
    }
    this.proofOfWork = proof
  }

  toJSON () {
    return {
      transactions: this.transactions,
      'proof-of-work': this.proofOfWork
    }
  }

  toString () {
    return JSON.stringify(this.toJSON())
  }

  static fromJSON (data) {
    return new BlockData({
      transactions: data.transactions,
      proofOfWork: data['proof-of-work']
    })
  }
}

/**
 * Single MicroChain block.
*/
class Block {
  constructor ({index, timestamp, data, hash}) {
    this.index = index
    this.timestamp = timestamp || new Date().toISOString()
    this.data = data || new BlockData()
    this.hash = hash
  }

  updateHash (previousBlock) {
    let hash = crypto.createHash('sha256')
    hash.update(`${this.index}${this.timestamp}`)
    hash.update(this.data.toString())
    if (previousBlock) {
      hash.update(previousBlock.hash)
    }
    this.hash = hash.digest('hex')
    return this
  }

  toJSON (idField = 'index') {
    return {
      [idField]: this.index,
      timestamp: this.timestamp,
      data: this.data.toJSON(),
      hash: this.hash
    }
  }

  async save () {
    debug('Block.save', this.index, this.timestamp)
    let json = this.toJSON('_id')
    return db.blocks.insert(json)
  }

  static fromJSON (data) {
    return new Block({
      index: data._id,
      timestamp: data.timestamp,
      data: BlockData.fromJSON(data.data),
      hash: data.hash
    })
  }
}

Block.GENESIS = new Block({
  index: 0
}).updateHash()

module.exports = {
  Block,
  BlockData
}
