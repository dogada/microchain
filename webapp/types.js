// @flow

export type Theme = {
  rtl?: boolean,
  dark?: boolean
}

export type HttpError = {
  statusCode?: number,
  message: string
}

export type JSONSchema = {
  id: string,
  version: number,
  title: string,
  description: string,
  type: string
}

export type Transaction = {
  from: string,
  to: string,
  amount: number
}

export type Block = {
  index: number,
  hash: string,
  timestamp: string,
  data?: {
    'proof-of-work': number,
    transactions: Array<Transaction>
  }
}

export type BlockTransaction = {
  block: {
    index: number,
    timestamp: string,
    hash: string
  },
  position: number,
  from: string,
  to: string,
  amount: number
}
