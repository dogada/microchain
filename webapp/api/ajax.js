// @flow

import fetchJson from './fetchJson'
import type {Block} from '~/types'

// TODO: implement ?since GET param to sync blockchain
export function loadBlocks (): Promise<Array<Block>> {
  return fetchJson(`blocks/`)
}
