// @flow

import fetchJson from './fetchJson'
import type {Block, Transaction} from '~/types'
import {MINER_ACCOUNT} from '~/shared/constants'

// TODO: implement ?since GET param to sync blockchain
export function loadBlocks (query: Object): Promise<Array<Block>> {
  let since = `${query.since || -1}`
  return fetchJson(`blocks/?since=${encodeURIComponent(since)}`)
}

export function mineBlock (): Promise<void> {
  return fetchJson(`blocks/`, {
    method: 'POST',
    body: {
      account: MINER_ACCOUNT
    }
  })
}

export function makeTransfer (transaction: Transaction): Promise<void> {
  return fetchJson(`transactions/`, {
    method: 'POST',
    body: transaction
  })
}

export function loadAccountTransactions (account: string): Promise<void> {
  return fetchJson(`transactions/`, {
    query: {account}
  })
}
