// @flow

import fetchJson from './fetchJson'
import type {Block} from '~/types'
import {MINER_ACCOUNT} from '~/shared/constants'

// TODO: implement ?since GET param to sync blockchain
export function loadBlocks (): Promise<Array<Block>> {
  return fetchJson(`blocks/`)
}

export function mineBlock (): Promise<void> {
  return fetchJson(`blocks/`, {
    method: 'POST',
    body: {
      account: MINER_ACCOUNT
    }
  })
}
