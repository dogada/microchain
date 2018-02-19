// @flow
import {ns} from '~/config'
import {namespaceConfig} from 'fast-redux'
import type {Block} from '~/types'
import {loadBlocks} from '~/api/ajax'

// FIXME: move to top level state.products (reducer/products.js)
type State = {
  blocks: Array<Block>,
  syncTime?: string
}

const DEFAULT_STATE = {
  blocks: []
}

export const {
  action,
  getState: getBlockchain
} = namespaceConfig(ns('blocks'), DEFAULT_STATE)

const addBlocks = action('appendBlocks',
  (state: State, data: Array<Block>) => ({
    blocks: [
      ...data,
      ...state
    ],
    syncTime: new Date().toISOString()
  })
)

/**
 * Sync local blockchain copy with remote blockchain.
*/
// TODO: improve performance
// for performance reasons we can not load full blocks with transaction here;
// we can load block transaction later when user will request them
export const syncBlocks = () =>
  (dispatch: Function, getState: Function): Promise<void> => {
    let {blocks} = getBlockchain(getState())
    let lastIndex = blocks.length ? blocks[0].index : undefined
    let loadPromise = loadBlocks({since: lastIndex})
      .then(data => dispatch(addBlocks(data)))
    // if we already have some blocks, show them immediately and
    // later repaint if need
    return lastIndex >= 0 ? Promise.resolve() : loadPromise
  }
