// @flow
import config, {ns} from '~/config'
import {namespaceConfig} from 'fast-redux'
import type {Block} from '~/types'
import * as api from '~/api/ajax'

const debug = config.debug('blocks')

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

export const addBlocks = action('addBlocks',
  function (state: State, data: Array<Block>) {
    debug('addBlocks', data.length)
    return {
      blocks: [
        ...data,
        ...state.blocks
      ],
      syncTime: new Date().toISOString()
    }
  }
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
    debug('lastIndex', lastIndex)
    return api.loadBlocks({since: lastIndex})
      .then(data => dispatch(addBlocks(data)))
      .catch(e => console.error(e)) // FIXME: show error in UI
  }

export const mineBlock = () =>
  (dispatch: Function): Promise<void> => {
    return api.mineBlock()
      .then(_ => dispatch(syncBlocks()))
      .catch(e => console.error(e)) // FIXME: show error in UI
  }
