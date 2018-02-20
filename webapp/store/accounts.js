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
  getState: getAccountsFromState
} = namespaceConfig(ns('accounts'), DEFAULT_STATE)

export const updateAccount = action('updateAccount',
  function (state: State, address: string, transactions: Array<Transaction>) {
    return {
      ...state,
      [address]: {
        transactions,
        syncTime: new Date().toISOString()
      }
    }
  }
)

export const makeTransfer = (transaction: Transaction) =>
  (dispatch: Function): Promise<void> => {
    debug('makeTransfer', transaction)
    // TODO: update pending transactions list
    return api.makeTransfer(transaction)
      .catch(e => console.error(e))
  }

export const loadAccountTransactions = (address: string) =>
  (dispatch: Function): Promise<void> => {
    return api.loadAccountTransactions(address)
      .then(data => dispatch(updateAccount(address, data.items)))
      .catch(e => console.error(e)) // FIXME: show error in UI
  }
