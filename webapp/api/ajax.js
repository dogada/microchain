// @flow

import fetchJson from './fetchJson'
import type {Block} from '~/types'
import {MINER_ACCOUNT} from '~/shared/constants'

// TODO: implement ?since GET param to sync blockchain
export function loadBlocks (query): Promise<Array<Block>> {
  return fetchJson(`blocks/?since=${encodeURIComponent(query.since || -1)}`)
}

export function mineBlock (): Promise<void> {
  return fetchJson(`blocks/`, {
    method: 'POST',
    body: {
      account: MINER_ACCOUNT
    }
  })
}
