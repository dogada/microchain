/**
  Shared in-memory buffer for storing transactions.
  TODO: make it durable.
*/
class TransactionBuffer {
  constructor () {
    this.transactions = []
  }

  addTransaction (transaction) {
    this.transactions.push(transaction)
  }

  getAllTransactions () {
    return this.transactions.slice()
  }

  reset () {
    this.transactions = []
  }
}

module.exports = new TransactionBuffer()
