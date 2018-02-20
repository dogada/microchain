// @flow
import config, {ns} from '~/config'
import {namespaceConfig} from 'fast-redux'
import type {Transaction} from '~/types'
import * as api from '~/api/ajax'

const debug = config.debug('transactions')

type State = {
  [string]: {
    transactions: Array<Transaction>,
    syncTime: string
  }
}

const DEFAULT_STATE = {}
export const {
  action,
  getState: getStateTransactions
} = namespaceConfig(ns('transactions'), DEFAULT_STATE)

export const makeTransfer = (transaction: Transaction) =>
  (dispatch: Function): Promise<void> => {
    debug('makeTransfer', transaction)
    // TODO: update pending transactions list
    return api.makeTransfer(transaction)
      .catch(e => console.error(e))
  }
